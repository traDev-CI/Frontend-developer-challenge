    import React, {useState, useEffect} from 'react';
    import MovieDetails from './MovieDetails';
    import { makeStyles } from '@material-ui/core/styles';
    import Card from '@material-ui/core/Card';
    import CardActionArea from '@material-ui/core/CardActionArea';
    import CardActions from '@material-ui/core/CardActions';
    import CardContent from '@material-ui/core/CardContent';
    import CardMedia from '@material-ui/core/CardMedia';
    import Typography from '@material-ui/core/Typography';
    import FavoriteIcon from '@material-ui/icons/Favorite';
    import IconButton from '@material-ui/core/IconButton';
    import { Grid } from '@material-ui/core';

    const useStyles = makeStyles(theme => ({
        root: {
          maxWidth: 445,
        },
        rootGrid: {
          flexGrow: 1,
        },
        media: {
          height: 400,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
          },
      }));

    const ListMovies = () =>{
        const [movies, setMovies] = useState([]);
        const [baseImgURL, setBaseImgURL] = useState('');
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
            runSearch('all')
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
            setMovies(data.results) 
        })
        }
       
        console.log(movies);

        useEffect(() => {
            getConfig()
        }, [])
        
        // movies.map((movie) => {
        //     console.log(movie)
        // })
        return (
            <React.Fragment className={classes.rootGrid}>
                {movies.map((movie) =>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.root}>
                       
                            <CardMedia 
                                className={classes.media}
                                image={`${baseImgURL}/original/${movie.poster_path}`}
                                title="Contemplative Reptile"
                            />
                            <CardActionArea>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {movie.popularity}
                                        </Typography>
                                    </CardContent>
                                    <MovieDetails id={movie.id} />
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                )}
            </React.Fragment>
        )

    }

    export default ListMovies;