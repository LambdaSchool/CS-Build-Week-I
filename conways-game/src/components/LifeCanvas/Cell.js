const white = "rgb(255,255,255)";
const black = "rgb(0,0,0)";
function parseRGBValues() {

}
class Cell {
    constructor(ctx, length) {
        this.ctx = ctx;
        this.length = length;
        this.color = white;
        this.isToggled = false;
        this.x = 0;
        this.y = 0;
    }
    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.rect(
            this.x,
            this.y,
            this.length,
            this.length
          );
        this.ctx.fill();
        this.ctx.stroke();
    }
    switchColors() {
        console.log(this.isToggled, this.color);
        if(this.isToggled === false) {
            this.color = black;
            this.isToggled = true;
        }
        else {
            this.color = white;
            this.isToggled = false;
        }
    }
}

export default Cell;