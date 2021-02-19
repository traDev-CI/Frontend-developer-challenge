import React, {useState, useEffect} from "react";

var baseURL = "https://api.themoviedb.org/3/";
var configData = null;
var APIKEY = "246b0bf3d0e3c6774646b3686452e8ab";

const Trending = (props) => {
    const { history } = props;
    const [trend, setTrends] = useState([]);
    const [baseImgURL, setBaseImgURL] = useState("");

    const getConfig = () => {
        let url = "".concat(baseURL, "configuration?api_key=", APIKEY);
        fetch(url)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            setBaseImgURL(data.images.secure_base_url);
            configData = data.images;
            getTrending();
          })
          .catch(function (err) {
            alert(err);
          });
      };

      const getTrending = (keyword) => {
        let url = "".concat( baseURL, "trending/tv/week?api_key=", APIKEY
        );
        fetch(url)
          .then((result) => result.json())
          .then((data) => {
            setTrends(data.results);
            console.log(data.results)
          });
      };
      

      useEffect(() => {
        getConfig()
      }, [])

    return <div>HELLO</div>
}

export default Trending;