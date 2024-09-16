
# Conway's Rules of Life

Conway's Game of Life is a solitary game where a user interacts with a grid of cells. These cells will survive under specific conditions and die in other specific conditions. These conditions are outlined below:

1. Any live cell with two or three live neighbours survives.

2. Any dead cell with three live neighbours becomes a live cell.

3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## My Version

The version of the game I created initially randomized the grid cells to one of two binary states (alive or dead). The current generation displays as a caption at the top of the window. The user is able to interact with the game through the use of the keyboard and mouse, outlined in the next section.

## User Events

The user can interact with the game by doing the following keypresses on the keyboard:

Key Press | Action | Explanation
----------|--------|------------
p | pause | Toggle pause for game state.
c | clear | Clears the screen, setting all cells to dead.
r | randomize | Randomizes the grid, setting all cells to either alive or dead.
h | help | Displays helper functions listed here inside the terminal window.
q | quit | Exits the Game.
n | next | Jump 1 generation forward.
j | jump | Jump X generations forward. Specified with user input in terminal
mouse-click | toggle-value | If the game is paused, user can toggle cells alive and dead by clicking on them.
