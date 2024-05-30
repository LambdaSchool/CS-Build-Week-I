import React, { Component } from 'react';
import './rules.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

const Rules = (props) => {

  window.setTimeout(()=>{
    let hdr = document.querySelector('.rules-container');
    hdr.classList.add('show-container')
  }, 100);

  return (
    <div className="rules-container" onClick={()=>{}}>
      <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" title="Learn more about mathetmatician John Conway's 'Game of Life'">
        <FontAwesomeIcon icon={faInfo} />
      </a>
    </div>
  )
};

export default Rules;


