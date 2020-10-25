import React from "react"
import { Text, StyleSheet, Image, View, Platform } from "react-native"
import colors from "../styles/styles"

const Category = (props) => {
	return (
		<View style={styles.subjectList}>
			<View style={styles.subjectImage}>
				<Image source={props.imageUri} style={styles.subjectImage} />
			</View>
			<View style={styles.subjectTextContainer}>
				<Text style={styles.subjectText}>{props.name}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	subjectList: {
		height: 140,
		width: 148,
		marginLeft: 20,
		borderWidth: 0,
		borderColor: "#dddddd",
	},
	subjectTextContainer: {
		flex: 1,
		paddingTop: 10,
	},
	subjectText: {
		fontSize: Platform.OS == "ios" ? 14 : 11,
		fontWeight: "700",
		color: colors.TEXT_COLOR,
	},
	subjectImage: {
		flex: 2,
		borderRadius: 10,
		resizeMode: "cover",
	},
})
export default Category
