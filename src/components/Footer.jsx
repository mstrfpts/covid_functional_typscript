import React, { Component } from "react";
import "./MainPage.css";

const Footer = () => {
  return (
    <footer style={{ textAlign: "left" }}>
      <nav>
        Created by{" "}
        <span className="tooltip">
          Derick D<span className="tooltiptext">mstrfpts@gmail.com</span>
        </span>
      </nav>
    </footer>
  );
};

export default Footer;
