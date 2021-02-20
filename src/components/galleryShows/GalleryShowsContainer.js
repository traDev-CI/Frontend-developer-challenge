import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShows } from '../../selectors';
import { fetchShows } from '../actions';
import GalleryShows from './GalleryShows';

const GalleryShowsContainer = ({ history }) => {
  const baseURL = "https://api.themoviedb.org/3/";
  const APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";
  const shows = useSelector(getShows);
  const dispatch = useDispatch();
  const [baseImgURL, setBaseImgURL] = useState('');

  const getConfig = () => {
    let url = `${baseURL}configuration?api_key=${APIKEY}`;
    fetch(url)
      .then(result => {
        return result.json();
      })
      .then(data => {
        setBaseImgURL(data.images.secure_base_url);
        runSearch('b');
      })
      .catch(function (err) {
        alert(err);
      });
  };
  const runSearch = keyword => {
    let url = ''.concat(
      baseURL,
      'search/tv?api_key=',
      APIKEY,
      '&query=',
      keyword
    );
    fetch(url)
      .then(result => result.json())
      .then(data => {
        const newDataN = data.results.sort();
        const newDataP = newDataN.sort(function (a, b) {
          return a.popularity - b.popularity;
        });
        console.log(data.results)
        dispatch(fetchShows(data.results));
      });
  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <GalleryShows
      shows={shows}
      baseImgURL={baseImgURL}
      handleButtonClick={handleButtonClick}
    />
  );
};

export default GalleryShowsContainer;
