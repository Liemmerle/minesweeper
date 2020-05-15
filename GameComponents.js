import React, { useState } from 'react';

import { View, Image, TouchableHighlight } from 'react-native';
import { styles, images, colors } from './Styles';


/**
 * Component showing the current game state
 * @param {game, playing, nextTurn} params : game is the current minesweeper game, playing a boolean which allow the player to press the cells or not, nextTurn the function triggered by each cell 
 */
export function GameGrid({game, playing, nextTurn}) {

	let grid = [];

	for(let x = 0 ; x < game.width ; x ++)
		for(let y = 0 ; y < game.height ; y ++)
			grid.push(<GameCell x={x} y={y} game={game} nextTurn={nextTurn} playing={playing} key={x + y * game.width} />);


	return (
		<View style={styles.gameGrid}>
			{grid}
		</View>
	)
}

/**
 * Component used to show one cell of the grid
 * 
 * @param {x, y, game, nextTurn, playing} params : (x, y) coordinates of the showed cell, game the current game, nextTurn the function triggered if the player press this cell and playing a boolean which allow or not the press
 */
function GameCell({x, y, game, nextTurn, playing}) {

	function play() {
		if(playing)
			nextTurn(x, y);
	}

	return game.revealed[x][y] ? 
			game.grid[x][y] == 0 ? (
				<View style={styles.revealedGameCell}>
				</View>
			) : (
			<View style={styles.revealedGameCell}>
				<Image style={styles.gameCellImage} source={game.grid[x][y] == -1 ? images.mine : images[game.grid[x][y]]} />
			</View>
		) : (
		<TouchableHighlight style={styles.gameCell} onPress={play} underlayColor={colors.grey}>
			{
				game.flags[x][y] == 0 ? (
					<View />
				) : (
					<Image style={styles.gameCellImage} source={images.flag} />
				)
			}
		</TouchableHighlight>
	)
}
