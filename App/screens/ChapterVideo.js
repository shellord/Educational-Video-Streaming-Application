import React,{useRef,useEffect,useState} from 'react'
import {View,StyleSheet,ActivityIndicator,Alert,AsyncStorage} from 'react-native'
import { Video } from 'expo-av'
import { Text } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'
import Constants from 'expo-constants'
import  Firebase from '../../config/Firebase'
import { AuthContext } from '../context'
import { ScrollView } from 'react-native-gesture-handler'
import VideoList from '../components/VideoList'
import UpgradeCard from '../components/UpgradeCard'
import colors from '../styles/styles'

const ChapterVideo = ({ route }) => {
  const {API_URL} = React.useContext(AuthContext)
  const [subscriptionStatus, setsubscriptionStatus] = useState(null)
  const [addView, setaddView] = useState(0)
  const [relatedVideos, setrelatedVideos] = useState([{}])

  useEffect(() => {
    if(addView==1){
      fetch(API_URL+'/api/addview/'+route.params.id)
      .catch((error)=>{
        alert("Network Error")
      })
   }
  }, [addView])

  useEffect(() => {
    const watchedVideo ={
      id:route.params.id,
      url:route.params.url,
      title:route.params.name,
      description:route.params.description,
      subject:route.params.subject,
      topic:route.params.topic,
      image:route.params.image,
      isfree:route.params.isfree,
      class:route.params.class
    }

    let watchHistory=watchedVideo

    AsyncStorage.getItem('watchHistory')
    .then(val => {    
      if (val !== null){
        let valJson = JSON.parse(val)
        if(!valJson.find(elem => elem.title === route.params.name)) {
          watchHistory = [...valJson,watchedVideo]
          AsyncStorage.setItem('watchHistory', JSON.stringify(watchHistory) )
          .then( ()=>{
          } )
          .catch( (error)=>{
            console.log(error)
          } )  
         }      
      }  
      else {
        AsyncStorage.setItem('watchHistory', JSON.stringify([watchHistory]) )
        .then( ()=>{
        } )
        .catch( (error)=>{
          console.log(error)
        } )  
    }
    })
  }, [])

  useEffect(() => {
    fetch(API_URL+`/api/users/email/${Firebase.auth().currentUser.email}`)
        .then((response) => response.json())
        .then((json) => {
          setsubscriptionStatus(json.response[0].subscription_status)
          if(subscriptionStatus==0 && !route.params.isfree){
            videoRef.current.pauseAsync()
            Alert.alert(
              "PREMIUM VIDEO",
              "You need to subscribe to Marvel Creative Learning Application to watch this lesson",
              [
                { text: "OK", onPress: () => route.params.nav.goBack() }
              ],
              { cancelable: false }
            )
          }
        })
        .catch((error) => {
        alert("Network Error!")
        })
  }, [subscriptionStatus])

  useEffect(() => {
    fetch(API_URL+'/api/relatedvideos/'+route.params.subject+'/'+route.params.topic+'/'+route.params.class+'/'+route.params.id)
      .then((response) => response.json())
      .then((json) => {
            setrelatedVideos(json.response)
      })
      .catch(error=>(alert("Network Error!")))
  }, [])

  const isFocused = useIsFocused();
  const videoRef = useRef()
  const [loaded, setLoaded] = useState(false);
  if(!isFocused){
    videoRef.current.pauseAsync()
  }

  const _onPlaybackStatusUpdate = playbackStatus => {

  if(playbackStatus.positionMillis>=10000 && !addView){
    setaddView(1)
  }
  
  if(playbackStatus.isBuffering){ 

    if(loaded){
      setLoaded(false); 
      }
    } else {
      if(!loaded){
        setLoaded(true); 
      }
    }
}
  return(
    <ScrollView style={styles.container}>
      {!loaded?(<ActivityIndicator size="large" color="#00ff00" style={{top:140,zIndex:2,padding:0,marginTop:-36}}/>):false}
      <Video
        source={{ uri: route.params.url }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        shouldPlay
        usePoster={true}
        isLooping={false}
        useNativeControls
        onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
        style={{ width: '100%', height: 280,marginTop:0,zIndex:1,backgroundColor:'black' }}
        ref={videoRef}
      />
      <View style={styles.description}>
      <View style={styles.titleContainer}>
        
        <Text style={styles.videoTitle}>{route.params.name}</Text>

        <View style={styles.tagTextContainer}>
          
                        <View style={styles.tagStyle}>
                            <Text style={styles.tagTextStyle}> {route.params.subject.toLowerCase()} </Text>
                            <Text style={styles.tagSupStyle}> • </Text>
                            <Text style={styles.tagTextStyle}> {route.params.topic.toLowerCase()} </Text>
                        </View>
                    </View>      
                    <Text style={styles.tagDescstyle}>
            {route.params.description}
        </Text>
      </View>
      </View>
      {!subscriptionStatus?<UpgradeCard/>:null}
      
      {relatedVideos[0]?(<VideoList title="Related Videos" data={relatedVideos} navigation={route.params.nav} userclass={route.params.class} />
):(<></>)}
     <Text></Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:0,
    flex:1,
    backgroundColor:colors.BACKGROUND_COLOR
    
  },
  videoTitle:{
    fontSize:20,
    fontWeight:"800",
    color:colors.HEADER_TEXT_COLOR
  },
  titleContainer:{
    flex:1,
    padding:15,
  },
  tagSupStyle:{
    fontSize:23,
    // color:"#607d8b"
    color:"tomato"

  },
  tagDescstyle:{
    marginBottom:0,
    fontSize:15,
    color:colors.TEXT_COLOR
  },
  tagTextContainer:{
     marginTop:0,
     alignItems:'flex-start'
  },
  tagStyle:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginBottom:5,
    marginLeft:-2
  },
  tagTextStyle:{
    // color:'#607d8b',
    color:'tomato',
    fontSize:14,
    // backgroundColor:'#eceff1',
    borderRadius:100,
    padding:0,
    marginRight:5,
    fontWeight:"600",
    textTransform:"capitalize",
  }
})

export default ChapterVideo