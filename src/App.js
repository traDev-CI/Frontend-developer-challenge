import ListMovies from './movies'
import AppBar from './components/AppBar/Appbar'
import GalleryShows from "./components/galleyShows/galleryShows";
import './App.css';
function App() {

  return (
    <div className="container">
      <AppBar />
      <GalleryShows />
    </div>
  );
}

export default App;
