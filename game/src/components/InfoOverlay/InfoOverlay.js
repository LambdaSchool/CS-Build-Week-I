import React, { Component } from 'react';

export default class InfoOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayOpen: false
    };
  }

  onScrimClick = e => {
    e.preventDefault();
    const scrim = this.refs.scrim;
    const content = this.refs.content;
    const about = this.refs.about;
    const rules = this.refs.rules;
    scrim.classList.remove('is-active');
    content.classList.remove('is-active');
    about.classList.remove('is-active');
    rules.classList.remove('is-active');
  };

  onAboutClick = e => {
    e.preventDefault();
    const scrim = this.refs.scrim;
    const content = this.refs.content;
    const about = this.refs.about;
    const rules = this.refs.rules;
    const aboutContent = this.refs.aboutContent;
    const rulesContent = this.refs.rulesContent;
    scrim.classList.add('is-active');
    content.classList.add('is-active');
    about.classList.add('is-active');
    rules.classList.remove('is-active');
    aboutContent.classList.add('is-active');
    rulesContent.classList.remove('is-active');
  };

  onRulesClick = e => {
    e.preventDefault();
    const scrim = this.refs.scrim;
    const content = this.refs.content;
    const about = this.refs.about;
    const rules = this.refs.rules;
    const aboutContent = this.refs.aboutContent;
    const rulesContent = this.refs.rulesContent;
    scrim.classList.add('is-active');
    content.classList.add('is-active');
    about.classList.remove('is-active');
    rules.classList.add('is-active');
    aboutContent.classList.remove('is-active');
    rulesContent.classList.add('is-active');
  };

  render() {
    return (
      <div className="info-overlay">
        <div ref="scrim" className="info-overlay__scrim" onClick={e => this.onScrimClick(e)}></div>
        <div ref="content" className="info-overlay__content-layer">
          <div className="info-overlay-header">
            <span ref="about" className="info-overlay-header__about" onClick={e => this.onAboutClick(e)}>About</span>
            <span ref="rules" className="info-overlay-header__rules" onClick={e => this.onRulesClick(e)}>Rules</span>
          </div>
          <div className="info-overlay-content">
            <div ref="aboutContent" className="info-overlay-content__about">
              <h2>About</h2>
              <span className="info-content">
              <p><span className="emphasis">Conway’s Game of Life</span> is an example of cellular automation. It consists of a grid of cells—each following a small number of rules for life or death. While these rules are very basic, they are also linked to the existence of other cells. The result is a visualization of how a complex and unpredictable system can emerge from simple and predictable elements.</p>
              <p>The <span className="emphasis">Game of Life</span> is Turing-complete, which means that it is able to emulate the famous, hypothetical computing machine proposed by Alan Turing.</p>
              </span>
            </div>

            <div ref="rulesContent" className="info-overlay-content__rules">
              <h2>Rules</h2>
              <span className="info-content">
                <p>In the <span className="emphasis">Game of Life</span>, each cell's existence is dependent on its neighboring cells.</p>
                <p>If a cell is alive and has 2 or 3 neighbors, then it remains alive. If it doesn't, it dies. 😭</p>
                <p>If a cell is dead and has exactly 3 neighbors, then it comes to life! 👶 Otherwise, it remains dead.</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}