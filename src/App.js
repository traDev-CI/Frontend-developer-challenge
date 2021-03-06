import React, { lazy, Suspense } from 'react';
import NavAppBar from './components/Navbar/AppNavBar';
import Footer from './components/Footer/Footer';
import LazyGalleryShows from './components/galleryShows/LazyGalleryShows';
import ShowDetails from './components/galleryShows/showDetails';
import Home from './components/Home/Home';
import './App.css';
import './components/galleryShows/showdetail.scss';
import './components/Footer/FooterGrid.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavAppBar />
      <Switch>
        <Route
          exact
          path="/gallery"
          render={props => <LazyGalleryShows {...props} />}
        />
        <Route
          exact
          path="/gallery/show/:id"
          render={props => <ShowDetails {...props} />}
        />
        <Route path="/" render={props => <Home {...props} />} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
