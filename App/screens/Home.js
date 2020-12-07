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
import LiveCarousel from "../components/LiveCarousel"
import colors from "../styles/styles"

const Home = ({ navigation }) => {
	
	const { API_URL, ASSETS_URL } = React.useContext(AuthContext)
	const [subjects, setSubjects] = useState([{}])
	const [featuredvids, setFeaturedvids] = useState([{}])
	const [latestvids, setLatestvids] = useState([{}])
	const [livevideos, setlivevideos] = useState([{}])
	const [userclass, setUserClass] = useState(1)
	const [userImage, setuserImage] = useState(null)
	const [username, setusername] = useState("User")
	const [subscribtionStatus, setsubscribtionStatus] = useState(0)
	const isFocused = useIsFocused()
	const [watchHistory, setwatchHistory] = useState()
	const [popularVideos, setpopularVideos] = useState([{}])
	const [syllabus, setsyllabus] = useState('scert')


	if (isFocused) {
		AsyncStorage.getItem("watchHistory").then((val) => {
			setwatchHistory(JSON.parse(val))
		})
		if(userImage){
			if(userImage.includes('default-user.png')){
				console.log(11)

				fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
					.then((response) => response.json())
					.then((json) => {
						setUserClass(json.response[0]["class"])
						setusername(json.response[0].firstname)
						setuserImage(ASSETS_URL + json.response[0].profile_pic)
						setsyllabus(json.response[0].syllabus)

					})
					.catch((error) => {
						alert("Error!")
					})
			}
		}
	}
	useEffect(() => {
		fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
			.then((response) => response.json())
			.then((json) => {
				setUserClass(json.response[0]["class"])
				setusername(json.response[0].firstname)
				setuserImage(ASSETS_URL + json.response[0].profile_pic)
				setsubscribtionStatus(json.response[0].subscription_status)
				setsyllabus(json.response[0].syllabus)
			})
			.catch((error) => {
				alert("Error!")
			})
			console.log(API_URL + "/api/subjects/" + userclass+"/"+ syllabus)
		fetch(API_URL + "/api/subjects/" + userclass+"/"+ syllabus)
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				setSubjects(json.response)
			})
			.catch((error) => {
				alert(error)
			})
		fetch(API_URL + "/api/videos/featured/" + userclass+"/"+syllabus)
			.then((response) => response.json())
			.then((json) => {
				setFeaturedvids(json.response)
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection[2]")
			})
		fetch(API_URL + "/api/popularvideos/" + userclass+"/"+syllabus)
			.then((response) => response.json())
			.then((json) => {
				setpopularVideos(json.response)
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection[3]")
			})
		fetch(API_URL + "/api/livevideos/" +userclass+"/"+syllabus)
			.then((response) => response.json())
			.then((json) => {
				setlivevideos(json.response)
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection[3]")
			})
		fetch(API_URL + "/api/videos/latest/" + userclass+"/"+syllabus)
			.then((response) => response.json())
			.then((json) => {
				setLatestvids(json.response)
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection[4]")
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
				syllabus={syllabus}
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
					title="Latest Videos"
					data={latestvids}
					navigation={navigation}
					userclass={userclass}
				/>
			) : (
				<></>
			)}
			{featuredvids?(	<Carousel
				title="Featured Videos"
				data={featuredvids}
				nav={navigation}
				userclass={userclass}
			/>):null}
		
			{popularVideos ? (
				<VideoList
					title="Popular Videos"
					data={popularVideos}
					navigation={navigation}
					userclass={userclass}
				/>
			) : (
				<></>
			)} 
			{livevideos ?	
			<LiveCarousel 
				title="Live Classes"
				data={livevideos}
				nav={navigation}
				userclass={userclass}
			/>:null}
		


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
