import React, { Component } from 'react';
import './header.scss';
import GOL from '../GoL_googly.svg';


const Header = (props) => {
  
  
  window.setTimeout(()=>{
    let hdr = document.querySelector('.header-container');
    hdr.classList.add('hide-container')
  }, 1000);
  window.setTimeout(()=>{
    let hdr = document.querySelector('.header-container');
    hdr.classList.add('header-container-small')
  }, 7000);


  return (
    <div className="header-container">
      <img src={require("../gol.svg")} />
    </div>
  )
};

export default Header;


