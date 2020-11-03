import React, { useState, useEffect } from "react"
import { StyleSheet, AsyncStorage, View } from "react-native"
import Carousel from "../components/Carousel"
import HeaderCarousel from "../components/HeaderCarousel"
import HorizontalScroll from "../components/HorizontalScroll"
import { ScrollView } from "react-native-gesture-handler"
import { AuthContext } from "../context"
import Firebase from "../../config/Firebase"
import { useIsFocused } from "@react-navigation/native"
import VideoList from "../components/VideoList"
import HeaderWelcome from "../components/HeaderWelcome"
import UpgradeCard from "../components/UpgradeCard"
import colors from "../styles/styles"
import * as Contacts from "expo-contacts"

const Home = ({ navigation }) => {
	const { API_URL, ASSETS_URL } = React.useContext(AuthContext)
	const [subjects, setSubjects] = useState([{}])
	const [featuredvids, setFeaturedvids] = useState([{}])
	const [latestvids, setLatestvids] = useState([{}])
	const [userclass, setUserClass] = useState(1)
	const [userImage, setuserImage] = useState(null)
	const [username, setusername] = useState("User")
	const [subscribtionStatus, setsubscribtionStatus] = useState(0)
	const isFocused = useIsFocused()
	const [watchHistory, setwatchHistory] = useState()
	const [popularVideos, setpopularVideos] = useState([{}])

	useEffect(() => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync()
			if (status === "granted") {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.FirstName],
				})

				if (data.length > 0) {
					//  console.log(data)
				}
			}
		})()
	}, [])

	if (isFocused) {
		AsyncStorage.getItem("watchHistory").then((val) => {
			setwatchHistory(JSON.parse(val))
		})
	}

	useEffect(() => {
		fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
			.then((response) => response.json())
			.then((json) => {
				setUserClass(json.response[0]["class"])
				setusername(json.response[0].name)
				setuserImage(ASSETS_URL + json.response[0].profile_pic)
				setsubscribtionStatus(json.response[0].subscription_status)
			})
			.catch((error) => {
				alert("Error!")
			})

		fetch(API_URL + "/api/subjects/" + userclass)
			.then((response) => response.json())
			.then((json) => {
				setSubjects(json.response)
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection")
			})
		fetch(API_URL + "/api/videos/featured/" + userclass)
			.then((response) => response.json())
			.then((json) => {
				setFeaturedvids(json.response)
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection")
			})
		fetch(API_URL + "/api/popularvideos/" + userclass)
			.then((response) => response.json())
			.then((json) => {
				setpopularVideos(json.response)
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection")
			})
		fetch(API_URL + "/api/videos/latest/" + userclass)
			.then((response) => response.json())
			.then((json) => {
				setLatestvids(json.response)
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection")
			})
	}, [userclass])
	return (
		<ScrollView style={styles.container}>
			<HeaderWelcome navigation={navigation} username={username} userimage={userImage} />
			<View style={styles.CarouselContainer}>
				{/* <HeaderCarousel /> */}
			</View>
			{!subscribtionStatus ? <UpgradeCard /> : null}
			<HorizontalScroll
				subjects={subjects}
				navigation={navigation}
				userclass={userclass}
			/>
			{watchHistory ? (
				<VideoList
					title="Continue Watching"
					data={watchHistory}
					navigation={navigation}
					userclass={userclass}
				/>
			) : (
				null
			)}
			{latestvids ? (
				<VideoList
					title="Online Classes"
					data={latestvids}
					navigation={navigation}
					userclass={userclass}
				/>
			) : (
				<></>
			)}
			<Carousel
				title="What's New?"
				data={featuredvids}
				nav={navigation}
				userclass={userclass}
			/>

			{/* {popularVideos ? (
				<VideoList
					title="Popular Videos"
					data={popularVideos}
					navigation={navigation}
					userclass={userclass}
				/>
			) : (
				<></>
			)} */}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.BACKGROUND_COLOR,
	},
	CarouselContainer: {
		marginHorizontal: 10,
	},
})

export default Home
