import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";

var baseURL = "https://api.themoviedb.org/3/";
var configData = null;
var APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";

const GalleryShows = (props) => {
  const { history } = props;
  const [shows, setShows] = useState([]);
  const [key, setKey] = useState(JSON.parse(localStorage.getItem("key")));
  const [baseImgURL, setBaseImgURL] = useState("");
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem("fav")) || false
  );

  const getConfig = () => {
    let url = "".concat(baseURL, "configuration?api_key=", APIKEY);
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setBaseImgURL(data.images.secure_base_url);
        configData = data.images;
        runSearch("c");
      })
      .catch(function (err) {
        alert(err);
      });
  };
  const runSearch = (keyword) => {
    let url = "".concat(
      baseURL,
      "search/tv?api_key=",
      APIKEY,
      "&query=",
      keyword
    );
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        const newDataN = data.results.sort();
        const newDataP = newDataN.sort(function (a, b) {
          return a.popularity - b.popularity;
        });
        setShows(data.results);
      });
  };
  const handledFavAction = (id) => {
    if (fav === false) {
      setKey(id);
      setFav(true);
    } else {
      setKey(0);
      setFav(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
    localStorage.setItem("key", JSON.stringify(key));
  }, [fav]);

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <main>
      <section className="cards">
        {shows.map((show) => (
          <div className="card">
            <div className="card__image-container">
              <img
                src={`${baseImgURL}/original/${show.poster_path}`}
                alt="Detailed image description would go here."
              />
            </div>
            <div className="card__content">
              <p className="card__title text--medium">
                {show.name}{" "}
                <IconButton
                  className={
                    (fav === true, key === show.id ? "iconFavM" : "iconFav")
                  }
                  onClick={() => handledFavAction(show.id)}
                >
                  <FavoriteIcon />
                </IconButton>
              </p>
              <div className="card__info">
                <p className="text--medium">{`Popularity ${show.popularity.toFixed(
                  2
                )}`}</p>
                <p className="card__price">
                  <Button
                    className="btn-more"
                    onClick={() =>
                      handleButtonClick(`/gallery/show/${show.id}`)
                    }
                  >
                    Show more
                  </Button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default GalleryShows;
