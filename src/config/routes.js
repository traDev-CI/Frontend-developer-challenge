// Gallery page
import GalleryShows from '../components/galleyShows/galleryShows'
import Home from '../components/Home/Home';
import MovieDetails from '../MovieDetails';

const routes = [
    {
        path: "/",
        component: Home,
        exact: false,
        routes: [
            {
                path: "/gallery",
                component: GalleryShows,
                exact: true
            },
            {
                path: "/gallery/show-details",
                component: MovieDetails,
                exact: true
            }
        ],

    },
]

export default routes;