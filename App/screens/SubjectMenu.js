import React,{useEffect,useState} from 'react'
import {Text,Button,useContext,View,FlatList} from 'react-native'
import VideoCard from '../components/VideoCard'
import VideoCardModel from '../components/VideoCardModel'
import { AuthContext } from "../context"

const SubjectMenu = ({ route }) => {
  const {API_URL} = React.useContext(AuthContext)
  const [videos,setVideos] =  useState([{}])
  const [isLoaded,setIsLoaded] = useState(0)
  
  useEffect(() => {
    fetch(API_URL+`/api/videos/${route.params.subject}/${route.params.name}`)
    .then((response) => response.json())
    .then((json) => {
          setVideos(json.response)
          setIsLoaded(1)
    })
    .catch((error) => {
      alert("Network Issue!.Check your internet connection")
    })
  }, [])

  if(!isLoaded){
    return(
      <Text>Loading</Text>
    )
  }
  
  return(
    <View>
      {/* {videos.map((video,key)=>{
          return(
            <VideoCard 
            key = {key}
            id={video.id}
            url={video.url}
            title = {video.title}
            description = {video.description}
            image={video.image}
            navigation={route.params.nav}
          />
          )
      })} */}
        <FlatList
          data={videos}
          renderItem={( {item} ) => 
            (
            <VideoCardModel
              id={item.id}
              url={item.url}
              title = {item.title}
              description = {item.description}
              image={item.image}
              subject={item.subject}
              topic={item.topic}
              navigation={route.params.nav}
          />

          )
        }
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
      />
    </View>
 
  )
}
  
export default SubjectMenu