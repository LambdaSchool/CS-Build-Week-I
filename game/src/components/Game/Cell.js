export default class Cell {
  constructor(isAlive = false, isClickable = false, color = 'rgba(199, 0, 37, 1)') {
    this.isAlive = isAlive;
    this.isClickable = isClickable;
    this.color = color;
  }

  setRandomColor = () => {
    this.color = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`;
  }

  setRandomAlpha = () => {
    let randomAlpha = Math.random();
    if (randomAlpha < .3) {
      randomAlpha = .3;
    }
    this.color = `rgba(199, 0, 37, ${randomAlpha})`;
  }

  create = () => {
    this.isAlive = true;
  }

  kill = () => {
    this.isAlive = false;
  }

  toggleState = () => {
    if (this.isAlive) {
      this.isAlive = false;
    } else {
      this.isAlive = true;
    }
  }

}
