import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";

const MovieDetails = (id) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [runtime, setRuntime] = useState([]);
  const [idD, setIdD] = useState(0);
  console.log(id);
  let baseURL = "https://api.themoviedb.org/3/";
  let APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";
  const showModal = (movieItem) => {
    // console.log(movieItem.id);
    movieDetail(movieItem.id);
  };
  const movieDetail = (idMovie) => {
    let url = "".concat(baseURL, "tv/", idMovie, "?api_key=", APIKEY);
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setDescription(data.overview);
        setGenres(data.genres);
        setRuntime(data.episode_run_time);
        setIdD(data.id);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    showModal(id);
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={`/gallery/show-details/${idD}`}>
            <Button style={{ color: "#fff" }} onClick={handleClickOpen}>
              Show details
            </Button>
          </Route>
        </Switch>
      </Router>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Description</h3>
            <p>{description}</p>
          </DialogContentText>
          <DialogContentText>
            <h3>Genres</h3>
            {genres.map((gen) => gen.name)}
          </DialogContentText>
          <DialogContentText>
            <h3>Runtime</h3>
            {runtime.map((min) => min)} min
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieDetails;
