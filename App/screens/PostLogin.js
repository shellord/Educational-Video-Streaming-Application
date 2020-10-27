import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, Image } from "react-native"
import { TouchableOpacity } from "react-native"
import { AuthContext } from "../context"
import Firebase from "../../config/Firebase"
import { CustomPicker } from "react-native-custom-picker"

const PostLogin = ({ navigation }) => {
	const { signOut } = React.useContext(AuthContext)
	const { API_URL } = React.useContext(AuthContext)
	const [options, setoptions] = useState([{ number: "" }])
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [error, setError] = useState("")
	const [selectedValue, setSelectedValue] = useState("1")

	useEffect(() => {
		fetch(API_URL + "/api/class")
			.then((response) => response.json())
			.then((json) => {
				setoptions(json.response)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
	const onCompleteHandler = () => {
		fetch(
			API_URL +
				`/api/users/register/${name}/${email}/${
					Firebase.auth().currentUser.phoneNumber
				}/${selectedValue}/scert/`
		)
			.then((response) => response.json())
			.then((json) => {
				navigation.push("ProfileDetails")
			})
			.catch((error) => {
				alert(error)
			})
	}

	return (
		<View style={styles.container}>
			<Image source={require("../../assets/logo.jpeg")} style={styles.logo} />

			<TextInput
				style={styles.inputText}
				onChangeText={(text) => setName(text)}
				value={name}
				placeholder="Name"
				maxLength={8}
			/>

			<TextInput
				style={styles.inputText}
				onChangeText={(text) => setEmail(text)}
				value={email}
				placeholder="Email"
				keyboardType="email-address"
			/>

			<Text style={{ marginTop: 30, fontSize: 12, color: "#2196f3" }}>
				Select Class
			</Text>

			<CustomPicker
				options={options}
				getLabel={(item) => item.value}
				defaultValue={1}
				onValueChange={(value) => {
					setSelectedValue(value.number)
				}}
			/>

			<TouchableOpacity
				style={styles.loginButton}
				onPress={() => onCompleteHandler()}
			>
				<Text style={styles.buttonText}>Next</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.SignupButton} onPress={() => signOut()}>
				<Text style={styles.buttonText}>Cancel</Text>
			</TouchableOpacity>
			<Text style={styles.errorMessage}>{error}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},
	inputText: {
		fontSize: 16,
		borderWidth: 0.5,
		width: "85%",
		textAlign: "center",
		borderColor: "#d3d3d3",
		padding: 15,
		backgroundColor: "#fafafa",
		marginTop: 10,
	},
	loginButton: {
		marginTop: 30,
		width: 300,
		alignItems: "center",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#2196f3",
	},
	SignupButton: {
		marginTop: 10,
		width: 300,
		alignItems: "center",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "red",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	errorMessage: {
		color: "red",
		marginTop: 10,
	},
	logo: {
		width: 130,
		height: 130,
		borderRadius: 20,
		marginBottom: 50,
	},
})

export default PostLogin
