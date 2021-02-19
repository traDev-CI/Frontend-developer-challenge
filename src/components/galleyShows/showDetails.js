import React, { useState, useEffect } from "react";
var baseURL = "https://api.themoviedb.org/3/";
var APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";

const ShowDetails = (props) => {
  const [data, setData] = useState(0);
  const [genres, setGenres] = useState([]);
  const [runtime, setRuntime] = useState([]);
  const [description, setDescription] = useState("");

  const movieDetail = (idMovie) => {
    let url = "".concat(baseURL, "tv/", idMovie, "?api_key=", APIKEY);
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        setGenres(data.genres);
        setRuntime(data.episode_run_time);
        setDescription(data.overview);
        console.log(data);
      });
  };

  let posterIMG = "https://image.tmdb.org/t/p/w500" + data.poster_path,
    backposter = "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
    name = data.name,
    firtsDat = data.first_air_date,
    episodes = data.number_of_episodes,
    seasons = data.number_of_seasons,
    genresList = nestedDataToString(genres);
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

  useEffect(() => {
    movieDetail(props.match.params.id);
  }, []);

  return (
    <div className="movie_card" id="bright">
      <div className="info_section">
        <div className="movie_header">
          <img className="locandina" src={posterIMG} />
          <h1>{name}</h1>
          <h4>{date.getFullYear()}</h4>
          <p>
            <span class="minutes">{`Runtime ${runtime} min`}</span>
          </p>
          <p className="type">{`Genres: ${genresList}`}</p>
          <p className="type"> {`${episodes} episodes`} </p>
          <p className="type"> {`${seasons} seasons`}</p>
        </div>
        <div className="movie_desc">
          <p className="text">{description.substring(0, 200)}</p>
        </div>
      </div>
      <div className="blur_back">
        <img className="fit" src={backposter} />
      </div>
    </div>
  );
};

export default ShowDetails;
