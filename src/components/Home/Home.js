import React from "react";
import Perfil from "../../assest/img/perfil.jpg";
import "./Home.css";


const Home = (props) => {
  const { history } = props;
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  return (
    <div className="main">
      <div className="container-card">
        <div className="card-top">
          <h3>Frontend developer</h3>
          <p>Challenge</p>
        </div>
        <div className="card-bottom">
          <span>Let's start</span>
          <img
            src={Perfil}
            alt="Alfredo"
            class="img"
          />
          <p className="name">Alfredo Rivas Jimenez</p>
          <div className="status">Active</div>
          <button className="btn" onClick={() => handleButtonClick("/gallery")}>
            Go to the gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
