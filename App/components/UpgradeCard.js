import React from "react"
import { View, Text, StyleSheet, ImageBackground } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"

const UpgradeCard = ({navigation}) => {
	return (
		<TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
		<View style={styles.container}>
			<ImageBackground
				style={styles.imgBackground}
				resizeMode="cover"
				source={require("../../assets/gopro.png")}
			>
				<View style={{ height: "100%" }}/>

			</ImageBackground>
		</View>
		</TouchableWithoutFeedback>
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
