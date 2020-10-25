import React from "react"
import { View, Text, StyleSheet, ImageBackground } from "react-native"

const UpgradeCard = () => {
	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.imgBackground}
				resizeMode="cover"
				source={require("../../assets/gopro.png")}
			>
				<View style={{ height: "100%" }}>
					<Text>&nbsp;</Text>
				</View>
			</ImageBackground>
		</View>
	)
}

export default UpgradeCard

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 20,
	},
	imgBackground: {
		width: "100%",
		height: 140,
		flex: 1,
	},
})
