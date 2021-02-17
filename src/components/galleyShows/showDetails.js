import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';



const ShowDetails = (props) => {
    const [data, setData] = useState(0);
    console.log(props.match.params.id)
    let baseURL = 'https://api.themoviedb.org/3/';
    let APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";

     const movieDetail = (idMovie) =>{
         let url = ''.concat(baseURL, 'tv/', idMovie, '?api_key=', APIKEY);
         fetch(url)
         .then(result => result.json())
         .then((data) => {
             setData(data);
             console.log(data)
             
         })
     }

        let posterIMG =  'https://image.tmdb.org/t/p/w500' + data.poster_path,
          name= data.name,
          description= data.overview,
          production = data.production,
          productionCountries = data.production_countries,
          genres = data.genres,
          runtime= data.episode_run_time,
          firtsDat= data.first_air_date,
          totalRevenue = data.revenue,
          productionList = nestedDataToString(production),
          productionCountriesList = nestedDataToString(productionCountries),
          noData = '-',
          genresList = nestedDataToString(genres),
          backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;
          const date = new Date(firtsDat);

          function nestedDataToString(nestedData) {
            let nestedArray = [],
                resultString;
            if(nestedData !== undefined){
              nestedData.forEach(function(item){
                nestedArray.push(item.name);
              });
            }
            resultString = nestedArray.join(', '); // array to string
            return resultString;
          };

    useEffect(() => {
        movieDetail(props.match.params.id)
    }, [])

    return (
      <div class="movie_card" id="bright">
      <div class="info_section">
        <div class="movie_header">
          <img class="locandina" src={posterIMG}/>
          <h1>{name}</h1>
          <h4>{date.getFullYear()}, David Ayer</h4>
          <p><span class="minutes">{`${runtime} min`}</span></p>
         
        </div>
        <div class="movie_desc">
          <p class="text">
            {description} 
          </p>
        </div>
        <div class="movie_social">
          <ul>
            <li><i class="material-icons">share</i></li>
            <li><i class="material-icons"></i></li>
            <li><i class="material-icons">chat_bubble</i></li>
          </ul>
        </div>
      </div>
      <div class="blur_back bright_back"></div>
    </div>
    )
}

export default ShowDetails;