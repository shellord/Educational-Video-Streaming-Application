import React,{useRef} from 'react'
import {View,StyleSheet} from 'react-native'
import { Video } from 'expo-av'
import { Text,Card, ListItem, Icon } from 'react-native-elements'

const ChapterVideo = ({ route }) => {
  const videoRef = useRef();
  return(
    <View style={styles.container}>
      <Video
        source={{ uri: route.params.url }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        shouldPlay
        isLooping
        useNativeControls
        style={{ width: '100%', height: 300,marginTop:-36 }}
        ref={videoRef}
      />
      <View style={styles.description}>
      <Card
          title='Description'
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