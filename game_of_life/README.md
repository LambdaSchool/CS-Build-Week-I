# Conway's Game of Life
## Trey McGarity's Version
using JS React and SASS <br>

### Rules of Game of Life
Any live cell with two or three live neighbours stays alive.<br>
Any dead cell with three live neighbours becomes a live cell.<br>
All other live cells die in the next generation. <br>
Also all other dead cells stay dead.<br>

### Structure
![wireframe](wireframes/wireframe_1.png)

Individual cells make Grid Component.<br>
Indvividual buttons make Controls Component.<br>
Individual starters make Presets Component.<br>
Grid, Controls, and Presets Components make up Game Component.<br>
Rules are separate component displaying text<br>
Game and Rules reside on App Component<br>

### Game Mechanics
run: uses rules while scanning through grid and changes state of cells.<br>
play: starts interval of scanning grid.<br>
pause: stops interval but doesn't clear grid.<br>
<br>
stop/clear: stops interval and clears grid.<br>
select cell: has hover and changes cell state (dead or alive).<br>
seeds: random, oscillator, glider, spaceship.<br>
