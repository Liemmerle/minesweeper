import React, { useState } from 'react';

import { View, Image, TouchableHighlight } from 'react-native';
import { styles, images, colors } from './Styles';


//composant affichant toute la grille
export function GameGrid({game, playing, nextTurn, mode}) {

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

//composant pour une case de la grille
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
