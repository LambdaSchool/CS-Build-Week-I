
/**
 * Palette:
lite gray: #a8a7a8
matte pink: #cc527a
brite pink: #e8175d
med gray: #474747
dark gray: #363636
burgundy: #96153e
lite burgundy: #a02e50
dark matte pink: #b74366, a83c5e
 */

class Cell {

  constructor(p, i, j){
    this.active = false;
    this.id = null;
    this.x = i;
    this.y = j;
    this.width = 20;
    this.height = 20;
    this.p = p;
    this.activeFill = "#e8175d";
    this.inactiveFill = "#a83c5e";
    this.generation = 0;
    this.centaFill = "#F1FFC0";
    this.hoverFill = "#363636";
  }

  getActivity = () => {
    return this.active;
  }

  toggleActive = () => {
    this.active = (this.active == false) ? true : false;
  }

  setActiveToTrue = () => {
    this.active = true;
  }

  setGeneration = (g) => {
    this.generation = g;
  }

  setActivity = (a) => {
    this.active = a;
  }

  setActiveToFalse = () =>{
    this.active = false;
  }

  randomActive = () => {
    let min = Math.floor(1), max = Math.floor(11);
    let rndmDigit = Math.floor(Math.random() * (max - min + 1)) + min;
    if(rndmDigit % 10 == 0){
      this.active = true;
    }
  }
  
  clicked = (x,y) => {
    if(x >= this.x*this.width && x < this.x*this.width+20){
      if(y >= this.y * this.width+20 && y < this.y * this.width+40){
        this.toggleActive();
      }
    }
  }

  setFill = () => {
    if(this.active == true){
        this.fill = this.activeFill;
    } else if (this.active == false) {
      this.fill = this.inactiveFill;
    }
    return this.fill;
  }

  setDimension = () => {
    if(this.active == true){
      this.width = 22;
    } else {
      this.width = 20;
    }
  }

  createRect = () => {
    let fillV = this.setFill();
    this.p.noStroke();
    this.p.rect(this.x*this.width, this.y*this.width, this.width-1, this.width-1);
    this.p.fill(fillV);
  }
}
  
export default Cell;