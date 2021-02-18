import ListMovies from './movies'
import NavAppBar from './components/Navbar/AppNavBar'
import GalleryShows from "./components/galleyShows/galleryShows";
import ShowDetails from './components/galleyShows/showDetails';
import Home from './components/Home/Home'
import './App.css';
import './components/galleyShows/showdetail.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routes from './config/routes'; 


function App() {

  return (
    <Router>
      <NavAppBar />
      <Switch>
        <Route exact path="/gallery" render={props => <GalleryShows {...props} /> } />
        <Route exact path="/gallery/show/:id" render={props => <ShowDetails {...props} />} />
        <Route path="/" render={props => <Home {...props} /> } />
        {/* {routes.map((route, index) => {
          return <RouteSubRoutes key={index} {...route} />
        })} */}
      </Switch>
    </Router>
  );
}


export default App;
