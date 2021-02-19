import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

var baseURL = "https://api.themoviedb.org/3/";
var configData = null;
var APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";

const GalleryShows = (props) => {
  const { history } = props;
  const [shows, setShows] = useState([]);
  const [baseImgURL, setBaseImgURL] = useState("");

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

  console.log(shows);

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const getNewDate = (date) => {
    const newDate = new Date(date);
    const monthStrign = new Array(
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    );
    const month = monthStrign[newDate.getMonth()];
    const day = newDate.getDate();
    const year = newDate.getFullYear();
      return month +" "+ (day + 1)+", "+ year
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <main>
      <section className="cards">
        {shows.map((show) => (
          <div
            className="card"
            onClick={() => handleButtonClick(`/gallery/show/${show.id}`)}
          >
            <div className="card__image-container">
              <img
                src={`${baseImgURL}/original/${show.poster_path}`}
                alt="Detailed image description would go here."
              />
            </div>
            <div className="card__content">
              <p className="card__title text--medium text--title">
                {show.name}{" "}
              </p>
              <div className="card__info">
                <p className="text--medium">
                  {getNewDate(show.first_air_date)}
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
