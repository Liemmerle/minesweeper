# Minesweeper

Here a small Minesweeper in react native.

## Installation

Run `npm install`.

Build the .apk with `expo build:platform`.

## Functionalities

You can press any of the cells in the grid to discover if there is a mine in it. If it contains one, you loose and you can restart a new game, elsewhere, the cell contain a number which indicate the number of adjacents mines. If there are none, all the adjacents cells are automatically discovered.

When all the empty cells are discovered, the game is won and a pop-up proposes you to restart a new game.

On the bottom left of the grid, a button allows you to switch into the "flag" mode : in this mode, a click on a cell mark/unmark it with a flag to indicates a potential mine.

On the bottom right, there is a counter indicating the number of mines not marked.

## Preview

Here a few screenshots : 
 - a normal game : 

<img src="readme/game%20screenshot.png" width=200/>

 - Victory pop-up : 

<img src="readme/victory%20screenshot.png" width=200/>

 - Defeat pop-up : 

<img src="readme/defeat%20screenshot.png" width=200/>
