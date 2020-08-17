import React,{useState,useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import Carousel from '../components/Carousel'
import HorizontalScroll from '../components/HorizontalScroll'
import LatestVideos from '../components/LatestVideos'
import { ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from "../context"

const Home = ({ navigation }) =>{
    const {API_URL} = React.useContext(AuthContext)
    const [subjects,setSubjects] = useState([{}])
    const [featuredvids,setFeaturedvids] = useState([{}])
    const [latestvids,setLatestvids] = useState([{}])

    useEffect(() => {
      fetch(API_URL+'/api/subjects')
      .then((response) => response.json())
      .then((json) => {
            setSubjects(json.response)
      })
      .catch((error) => {
        alert("Network Issue!.Check your internet connection")
      })
      fetch(API_URL+'/api/videos/featured')
      .then((response) => response.json())
      .then((json) => {
            setFeaturedvids(json.response)
      })
      .catch((error) => {
        alert("Network Issue!.Check your internet connection")
      })      
      fetch(API_URL+'/api/videos/latest')
      .then((response) => response.json())
      .then((json) => {
            setLatestvids(json.response) 
      })
      .catch((error) => {
        alert("Network Issue!.Check your internet connection")
      })      
    }, [])
    return (
        <ScrollView style={styles.container}>
          <Carousel data={featuredvids} nav={navigation}/>
          <HorizontalScroll subjects={subjects} navigation={navigation} />
          <LatestVideos data={latestvids} navigation={navigation} />
        </ScrollView>
      )
    }

  const styles=StyleSheet.create({
        container:{
          backgroundColor:'white'
        }
  })
  
  export default Home