import React from 'react';
import './BackgroundContainer.css';
import backgroundImage from '../Photo/Background2.png';

const BackgroundContainer = () => {
  return (
    <div
      className="background-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};

export default BackgroundContainer;
