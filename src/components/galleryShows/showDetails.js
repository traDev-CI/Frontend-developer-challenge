import React, { useState, useEffect } from "react";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

var baseURL = "https://api.themoviedb.org/3/";
var APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";

const ShowDetails = (props) => {
  const [data, setData] = useState(0);
  const [genres, setGenres] = useState([]);
  const [runtime, setRuntime] = useState([]);
  const [creator, setCreator] = useState([]);
  const [description, setDescription] = useState("");
  const [key, setKey] = useState(JSON.parse(localStorage.getItem("key")));
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem("fav")) || false
  );

  const movieDetail = (idMovie) => {
    let url = "".concat(baseURL, "tv/", idMovie, "?api_key=", APIKEY);
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        setGenres(data.genres);
        setRuntime(data.episode_run_time);
        setDescription(data.overview);
        setCreator(data.created_by);
      });
  };

  let posterIMG = "https://image.tmdb.org/t/p/w500" + data.poster_path,
    backposter = "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
    name = data.name,
    firtsDat = data.first_air_date;
  const date = new Date(firtsDat);

  function nestedDataToString(nestedData) {
    let nestedArray = [],
      resultString;
    if (nestedData !== undefined) {
      nestedData.forEach(function (item) {
        nestedArray.push(item.name);
      });
    }
    resultString = nestedArray.join(", "); // array to string
    return resultString;
  }
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

  useEffect(() => {
    movieDetail(props.match.params.id);
  }, []);

  return (
    <div className="movie_card" id="bright">
      <div className="info_section">
        <div className="movie_header">
          <img className="locandina" src={posterIMG} />
          <h1 className="title-details">{`${name} (${date.getFullYear()})`}</h1>
          <p className="subTitle-details">{`${nestedDataToString(
            genres
          )} ° ${runtime}m`}</p>
          <p className="user_score">
            Score Breakdown
            <h5>
              <StarIcon className="icon-start" />
              {`${data.vote_count} Ratings`}
            </h5>
            <h5>
              <StarIcon className="icon-start" />
              {`${data.vote_average} History`}
            </h5>
          </p>
        </div>
        <div className="movie_desc">
          <h1>
            Overview{" "}
            <IconButton className={ (fav === true, key === props.match.params.id ? "iconFavRed" : "iconFav")}  onClick={() => handledFavAction(props.match.params.id)}>
              {" "}
              <FavoriteIcon />
            </IconButton>
          </h1>
          <p className="text">{description.substring(0, 200)}</p>
          <h1 className="creator">{creator.map((c) => c.name)}</h1>
          <p className="text">Creator</p>
        </div>
      </div>
      <div className="blur_back">
        <img className="fit" src={backposter} />
      </div>
    </div>
  );
};

export default ShowDetails;
