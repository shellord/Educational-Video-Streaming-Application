import React from "react"
import { View, Text, Image, StyleSheet, Platform } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from "../styles/styles"

const HeaderWelcome = ({ username, userimage , navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.userContainer}>
				<Text style={styles.userText}>Hello</Text>
				<Text style={styles.userName}>{username}!</Text>
			</View>
			<View style={styles.avatarContainer}>
			<TouchableOpacity  onPress={() => navigation.navigate('ProfileScreen',{username:username,userimage:userimage})}>

				{userimage ? (
					<Image source={{ uri: userimage }} style={styles.avatar} />
				) : (
					<Image
					source={require("../../assets/userdefault.png")}
					style={styles.avatar}
					/>
					)}
					<View style={{alignItems:'center'}}>
						<Ionicons style={{marginTop:3}} name='md-create' size={14} color='#1E88E5' />
					</View>
				
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default HeaderWelcome

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 20,
		padding: 10,
		flexDirection: "row",
	},
	avatarContainer: {
		flex: 1,
		alignItems: "center",
		// padding: 10,
		justifyContent: 'center',
	},
	avatar: {
		flex: 1,
		justifyContent: "flex-end",
		height: 60,
		width: 60,
		borderRadius: 75,
	},
	userContainer: {
		flex: 2,
		height: 70,
	},
	userText: {
		fontSize: Platform.OS === "ios" ? 44 : 25,
		color: colors.TEXT_COLOR,
	},
	userName: {
		fontWeight: Platform.OS === "ios" ? "600" : "700",
		fontSize: Platform.OS === "ios" ? 44 : 25,
		color: colors.TEXT_COLOR,
	},
})
