import React, {useRef, useEffect, useState} from 'react';
import { Image, View, Animated, Easing, TouchableHighlight, ImageBackground } from 'react-native';
import { styles, images, colors } from './Styles';
import { GameGrid } from './GameComponents';
import { Game } from './Game';

/**
 * main component of the minesweeper
 */
export default function App() {
	var [gameCode, setGameCode] = useState(0);
	var [game, setGame] = useState(new Game(10, 10, 10));
	let [mode, setMode] = useState(0);
	let [turn, setTurn] = useState(0);

	function nextTurn(x, y) {
		setTurn(turn + 1);
		if(mode == 0 && game.flags[x][y] == 0) {
			var result = game.reveal(x, y);
			if(result != 0)
			setGameCode(result);
		}else if(mode == 1) {
			game.changeFlag(x, y);
		}
	}

	function nextGame() {
		setGame(new Game(10, 10, 10));
	}

	function next() {
		nextGame();
		setGameCode(0);
	}

	return gameCode == -1 ? (
		<ImageBackground source={images.background} style={styles.container}>
				<GameGrid game={game} playing={false} nextTurn={nextTurn} />
				<Footer game={game} mode={mode} setMode={setMode} />
				<PopUp img={images.defeat} nextGame={next} />
		</ImageBackground>
	) : gameCode == 1 ? (
		<ImageBackground source={images.background} style={styles.container}>
				<GameGrid game={game} playing={false} nextTurn={nextTurn} />
				<Footer game={game} mode={mode} setMode={setMode} />
				<PopUp img={images.victory} nextGame={next} />
		</ImageBackground>
	) : (
		<ImageBackground source={images.background} style={styles.container}>
					<GameGrid game={game} playing={true} nextTurn={nextTurn} />
					<Footer game={game} mode={mode} setMode={setMode} />
		</ImageBackground>
	);
}

/**
 * animated popup in case of victory or defeat
 * @param {img, nextGame} params : img is the image source to show in the top-part of the popup, nextGame a function used to play a new game 
 */
function PopUp({img, nextGame}) {
	const yPos = useRef(new Animated.Value(100)).current;
	const height = useRef(new Animated.Value(100)).current;


	//animation
	useEffect(() => {
		Animated.sequence([
			Animated.timing(
				yPos,
				{
					toValue: 0,
					easing: Easing.out(Easing.ease),
					duration: 1000,
				}
			),

			Animated.timing(
				height,
				{
					toValue: 140,
					easing: Easing.quad,
					duration: 250,
				}
			),

			Animated.timing(
				height,
				{
					toValue: 100,
					easing: Easing.quad,
					duration: 250,
				}
			)
		]).start()
	}, []);

	return (
		<Animated.View style={{...styles.container,
			top: yPos.interpolate({
				inputRange: [0, 100],
				outputRange: ["0%", "100%"]
			})}}>
			<Animated.View style={{...styles.popUp,
				height: height.interpolate({
					inputRange: [100, 200],
					outputRange: ["20%", "40%"]
				})}}>
				<Animated.Image source={img} style={styles.popUpImage} />
				<TouchableHighlight onPress={nextGame} style={styles.popUpTouchable} underlayColor={colors.grey}>
					<Animated.Image source={images.retry} style={styles.popUpButtonImage}  />
				</TouchableHighlight>
			</Animated.View>
		</Animated.View>
	)
}

/**
 * Component at the bottom of the game grid, contains the button which allow to put a flag on cells and the number of remaining mines
 * @param {game, mode, setMode} params : game is the current game, mode is set to 0 if the player want to reveal a cell and to 1 if the player want to put a flag on it, setMode is a function used to change the mode 
 */
function Footer({game, mode, setMode}) {

	let score = "" + (game.mineNumber - game.flags.reduce((a, b) => a.concat(b), []).reduce((a, b) => a + b, 0));

	let scoreViews = [];
	let i = 0;

	for(let c of score)
		scoreViews.push(<Image source={images[c]} key = {i ++} style={styles.scoreImage}/>)

	return (
		<View style={styles.footer}>
			<TouchableHighlight onPress={() => setMode(1 - mode)}>
				<Image source={mode == 1 ? images.flag : images.mine} style={styles.footerButton}></Image>
			</TouchableHighlight>
			<View style={styles.score}>
				{scoreViews}
			</View>
		</View>
	);
}
