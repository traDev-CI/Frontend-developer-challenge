import React, { useState, useEffect } from "react";
import "./Footer.css";
import "./FooterGrid.scss";

const Footer = () => {
 
  return (
    <div className="footer">
      <div class="Grid Grid--full">
        <div class="Grid-cell">
          <div class="Demo Holly">
            <strong>THE MOVIE DB</strong>
            <br /> Copyright &copy; Alfredo Rivas Jimenez
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
