import React,{useState,useEffect} from 'react'
import {StyleSheet,AsyncStorage} from 'react-native'
import Carousel from '../components/Carousel'
import HorizontalScroll from '../components/HorizontalScroll'
import { ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from "../context"
import  Firebase from '../../config/Firebase'
import { useIsFocused } from '@react-navigation/native'
import VideoList from '../components/VideoList'

const Home = ({ navigation }) =>{
    const {API_URL} = React.useContext(AuthContext)
    const [subjects,setSubjects] = useState([{}])
    const [featuredvids,setFeaturedvids] = useState([{}])
    const [latestvids,setLatestvids] = useState([{}])
    const [userclass,setUserClass] = useState(1)
    const isFocused = useIsFocused()
    const [watchHistory, setwatchHistory] = useState()
    const [popularVideos, setpopularVideos] = useState([{}])

    if(isFocused){
      AsyncStorage.getItem('watchHistory')
      .then(val => {
          setwatchHistory(JSON.parse(val))
      })          
    }

    useEffect(() => {
      fetch(API_URL+`/api/users/${Firebase.auth().currentUser.phoneNumber}`)
      .then((response) => response.json())
      .then((json) => {
           setUserClass(json.response[0]['class'])
      })
      .catch((error) => {
      alert("Error!")
      })

      fetch(API_URL+'/api/subjects/'+userclass)
      .then((response) => response.json())
      .then((json) => {
            setSubjects(json.response)
      })
      .catch((error) => {
        alert("Network Issue!.Check your internet connection")
      })
      fetch(API_URL+'/api/videos/featured/'+userclass)
      .then((response) => response.json())
      .then((json) => {
            setFeaturedvids(json.response)
      })
      .catch((error) => {
        alert("Network Issue!.Check your internet connection")
      })    
      fetch(API_URL+'/api/popularvideos/'+userclass)
      .then((response) => response.json())
      .then((json) => {
            setpopularVideos(json.response)
      })
      .catch((error) => {
        alert("Network Issue!.Check your internet connection")
      })      
      fetch(API_URL+'/api/videos/latest/'+userclass)
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
          <Carousel data={featuredvids} nav={navigation} userclass={userclass}/>
          <HorizontalScroll subjects={subjects} navigation={navigation} userclass={userclass}/>
          {watchHistory?(<VideoList title="Continue Watching" data={watchHistory} navigation={navigation} userclass={userclass} />
):(<></>)}
          <VideoList title="Latest Classes" data={latestvids} navigation={navigation} userclass={userclass} />
          <VideoList title="Popular Videos" data={popularVideos} navigation={navigation} userclass={userclass} />
        </ScrollView>
      )
    }

  const styles=StyleSheet.create({
        container:{
          backgroundColor:'white'
        }
  })
  
  export default Home