import ListMovies from './movies'
import NavAppBar from './components/Navbar/AppNavBar'
import GalleryShows from "./components/galleyShows/galleryShows";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routes from './config/routes'; 


function App() {

  return (
    <Router>
      <NavAppBar />
      <Switch>
        <Route exact path="/gallery" render={props => <GalleryShows key={1} {...props} /> } />
        {/* <Route exact from="/" render={props => <Home {...props} />} /> */}
        {/* {routes.map((route, index) => {
          return <RouteSubRoutes key={index} {...route} />
        })} */}
      </Switch>
    </Router>
  );
}


export default App;
