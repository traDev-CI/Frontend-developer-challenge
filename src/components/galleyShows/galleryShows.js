import React, {useState, useEffect, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MovieDetails from '../../MovieDetails';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((muiBaseTheme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
}));

const GalleryShows = () =>{
    const [shows, setShows] = useState([]);
    const [key, setKey] = useState(JSON.parse(localStorage.getItem('key')));
    const [baseImgURL, setBaseImgURL] = useState('');
    const [fav, setFav] = useState(JSON.parse(localStorage.getItem('fav'))  || false);
    const classes = useStyles();
    let baseURL = 'https://api.themoviedb.org/3/';
    let configData = null;
    let APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";


    const getConfig = () => {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY); 
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        setBaseImgURL(data.images.secure_base_url);
        configData = data.images;
        console.log('config:', data);
        console.log(configData);
        runSearch('a')
    })
    .catch(function(err){
        alert(err);
    });
    }
    const runSearch = (keyword) => {
    let url = ''.concat(baseURL, 'search/tv?api_key=', APIKEY, '&query=', keyword);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        const newDataN = data.results.sort();
        const newDataP = newDataN.sort(function(a,b){ 
          return a.popularity - b.popularity; 
        }); 
      setShows(data.results) 
    })
    }
    const handledFavAction = (id) =>{
      if(fav === false){
        setKey(id)
        setFav(true)
      }else{
        setKey(0)
        setFav(false)
      }
    }


    useEffect(() => {
      localStorage.setItem('fav', JSON.stringify(fav));
      localStorage.setItem('key', JSON.stringify(key))
    }, [fav])

    useEffect(() => {
        getConfig()
    }, [])
    
  

    
    return (
      <main>
      <section class="cards">
      {shows.map((show) => 
        <div class="card">
          <div class="card__image-container">
            <img
              src={`${baseImgURL}/original/${show.poster_path}`}
              alt="Detailed image description would go here."
            />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
              {show.name}   <IconButton className={fav === true, key === show.id ? "iconFavM" : "iconFav"} onClick={() => handledFavAction(show.id)} ><FavoriteIcon /></IconButton>
            </p>
            <div class="card__info">
              <p class="text--medium">{show.popularity}</p>
              <Router>
                  <p class="card__price text--medium"><MovieDetails id={show.id} /></p>
              </Router>
            </div>
          </div>
        </div>
         )}
      </section>
    </main>
    )

}

export default GalleryShows;