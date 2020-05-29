import React,{useState,useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import Carousel from '../components/Carousel'
import HorizontalScroll from '../components/HorizontalScroll'
import LatestVideos from '../components/LatestVideos'

const Home = ({ navigation }) =>{
    const [subjects,setSubjects] = useState([{}])
    const [featuredvids,setFeaturedvids] = useState([{}])

    useEffect(() => {
      fetch('http://3.134.99.150:3000/api/subjects')
      .then((response) => response.json())
      .then((json) => {
            setSubjects(json.response)
            console.log(json.response)
      })
      .catch((error) => {
        alert("Network Issue!.Check your internet connection")
      })
      fetch('http://3.134.99.150:3000/api/videos/featured')
      .then((response) => response.json())
      .then((json) => {
            setFeaturedvids(json.response)
            
      })
      .catch((error) => {
        alert("Network Issue!.Check your internet connection")
      })      
    }, [])

    return (
        <View style={styles.container}>
          <Carousel data={featuredvids} nav={navigation}/>
          <HorizontalScroll subjects={subjects} navigation={navigation} />
          <LatestVideos nav={navigation} />
        </View>
      )
    }

  const styles=StyleSheet.create({
        container:{
        }
  })
  export default Home