import React, { useState } from "react"
import { StyleSheet, Text, View, Image, Alert, TextInput } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import Constants from "expo-constants"
import { TouchableOpacity } from "react-native-gesture-handler"
import { AuthContext } from "../context"
import Firebase from "../../config/Firebase"
import { SafeAreaView } from "react-native-safe-area-context"

export default function App() {
	const { API_URL } = React.useContext(AuthContext)
	const { finishLogin } = React.useContext(AuthContext)
	const [image, setimage] = useState(null)
	const [address, setaddress] = useState(null)
	const [imageUploaded, setimageUploaded] = useState(0)
	const [addressUploaded, setaddressUploaded] = useState(0)

	const askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
		if (permissionResult.status !== "granted") {
			Alert.alert("no permissions to access camera!", [{ text: "ok" }])
			return false
		}
		return true
	}
	const uploadImage = (image) => {
		let uri = image.uri
		let fileExtension = uri.substr(uri.lastIndexOf(".") + 1)

		fetch(`${API_URL}/api/upload/`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: Firebase.auth().currentUser.phoneNumber,
				imgsource: image.base64,
				imgname:
					Math.random().toString(36).substring(2, 15) +
					Math.random().toString(36).substring(2, 15) +
					"." +
					fileExtension,
			}),
		})
			.then(setimageUploaded(1))
			.catch((err) => console.log(err))
	}

	const uploadAddress = (address) => {
		fetch(`${API_URL}/api/addAddress/`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: Firebase.auth().currentUser.phoneNumber,
				address: address,
			}),
		})
			.then(setaddressUploaded(1))
			.catch((err) => console.log(err))
	}

	const submitData = () => {
		image ? uploadImage(image) : null
		address ? uploadAddress(address) : alert("Enter Valid Address!")
		imageUploaded && addressUploaded ? finishLogin() : null
	}

	takeImage = async () => {
		// make sure that we have the permission
		const hasPermission = await askForPermission()
		if (!hasPermission) {
			return
		} else {
			// launch the camera with the following settings
			let image = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [3, 3],
				quality: 1,
				base64: true,
			})
			// make sure a image was taken:
			if (!image.cancelled) {
				setimage(image)
			}
		}
	}
	return (
		<SafeAreaView style={styles.container}>
			{image ? (
				<Image source={{ uri: image.uri }} style={styles.imageStyle} />
			) : (
				<Image
					source={require("../../assets/userdefault.png")}
					style={styles.imageStyle}
				/>
			)}
			<TouchableOpacity onPress={takeImage}>
				<Text style={styles.imageButton}>Choose Photo</Text>
			</TouchableOpacity>
			<Text>Enter Address</Text>
			<View style={styles.textAreaContainer}>
				<TextInput
					style={styles.textArea}
					underlineColorAndroid="transparent"
					placeholder="Enter your address here"
					placeholderTextColor="grey"
					numberOfLines={10}
					multiline={true}
					textAlignVertical="top"
					onChangeText={(value) => setaddress(value)}
					value={address}
				/>
			</View>
			<TouchableOpacity onPress={submitData}>
				<Text style={styles.submitButton}>Done</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	imageStyle: {
		width: 150,
		height: 150,
		borderRadius: 100,
		margin: 10,
	},
	imageButton: {
		color: "#1E88E5",
		margin: 10,
	},
	submitButton: {
		color: "#1E88E5",
		margin: 10,
	},
	textAreaContainer: {
		borderColor: "grey",
		borderWidth: 1,
		margin: 10,
		width: 300,
	},
	textArea: {
		height: 150,
		padding: 10,
	},
})
