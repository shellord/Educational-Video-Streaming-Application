import React,{useRef,useEffect,useState} from 'react'
import {View,StyleSheet,ActivityIndicator} from 'react-native'
import { Video } from 'expo-av'
import { Text,Card } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';
import {NavigationActions} from '@react-navigation/bottom-tabs'
import { PlatformColor } from 'react-native';

const ChapterVideo = ({ route }) => {
  
  const isFocused = useIsFocused();
  const videoRef = useRef()
  const [loaded, setLoaded] = useState(false);
  if(!isFocused){
    videoRef.current.pauseAsync()
  }

  const _onPlaybackStatusUpdate = playbackStatus => {
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
    <View style={styles.container}>
      {!loaded?(<ActivityIndicator size="large" color="#00ff00" style={{top:150,zIndex:2,padding:0,marginTop:-36}}/>):false}
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
        style={{ width: '100%', height: 300,marginTop:0,zIndex:1,backgroundColor:'black' }}
        ref={videoRef}
      />
      <View style={styles.description}>
      <Card
          title={route.params.name}
          >
        <Text style={{marginBottom: 10}}>
            {route.params.description}
        </Text>
      </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:0,
    flex:1
  },
  description:{
    backgroundColor:'white',
    marginTop:0
  
  }
})

export default ChapterVideo