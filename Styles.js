
import { StyleSheet } from 'react-native';




export const colors = {
	white: '#fff',
	lightBlue: '#cbdbfc',
	lightGrey: "#9badb7",
	grey: '#696a6a',
	darkGrey: '#595652',
	transparent: "#0000",
	purple: "#45283c",
}

export const images = {
	background: require("./assets/background.png"),
	mine: require("./assets/mine.png"),
	"-": require("./assets/m.png"),
	0: require("./assets/0.png"),
	1: require("./assets/1.png"),
	2: require("./assets/2.png"),
	3: require("./assets/3.png"),
	4: require("./assets/4.png"),
	5: require("./assets/5.png"),
	6: require("./assets/6.png"),
	7: require("./assets/7.png"),
	8: require("./assets/8.png"),
	9: require("./assets/9.png"),
	flag: require("./assets/flag.png"),
	victory: require("./assets/victory.png"),
	defeat: require("./assets/defeat.png"),
	retry: require("./assets/retry.png"),
}

export const styles = StyleSheet.create({
	gameGrid: {
		width: "97.5%",
		aspectRatio: 1,
		backgroundColor: colors.grey,
		justifyContent: "center",
		alignItems: 'center',
		alignContent: 'center',
		flexWrap: "wrap",
		borderColor: colors.purple,
		borderWidth: 1,
	},

	container: {
		height: "100%",
		width: "100%",
		position: "absolute",
		backgroundColor: colors.transparent,
		justifyContent: "center",
    alignItems: 'center',
	},

	popUp: {
		aspectRatio: 2,
		backgroundColor: colors.lightGrey,
		justifyContent: "center",
    alignItems: 'center',
		borderColor: colors.darkGrey,
		borderWidth: 1,
	},

	popUpImage: {
		height: "50%",
		aspectRatio: 4,
		resizeMode: "stretch",
	},

	popUpTouchable: {
		height: "50%",
		width: "100%",
		backgroundColor: colors.lightBlue,
		borderColor: colors.grey,
		borderWidth: 1,
	},

	popUpButtonImage: {
		height: "100%",
		aspectRatio: 4,
		resizeMode: "stretch"
	},

	revealedGameCell: {
		backgroundColor: colors.lightGrey,
		width: "9.9%",
		borderColor: colors.grey,
		borderWidth: 0.5,
		aspectRatio: 1,
	},

	gameCellImage: {
		width: "100%",
		height: "100%"
	},

	gameCell: {
		backgroundColor: colors.lightBlue,
		width: "9.9%",
		borderColor: colors.grey,
		borderWidth: 0.5,
		aspectRatio: 1,
	},

	buttonText: {
		backgroundColor: colors.pink,
		height: "50%",
		width: "100%"
	},

	footer: {
		width: "97.5%",
		height: 50,
		alignItems: "center",
		alignContent: "center",
		justifyContent: "space-between",
		flexDirection: "row"
	},

	footerButton: {
		backgroundColor: colors.lightBlue,
		borderColor: colors.grey,
		borderWidth: 1,
		height: "100%",
		aspectRatio: 1,
	},

	score: {
		alignItems: "flex-start",
		alignContent: "center",
		flexDirection: "row",
		backgroundColor: colors.lightGrey,
		borderColor: colors.grey,
		borderWidth: 1,
		height: "100%",
	},

	scoreImage: {
		height: 50,
		width: 50,
	}

});
