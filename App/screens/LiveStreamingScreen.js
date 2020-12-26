import React from 'react'
import {View,StyleSheet,ActivityIndicator} from 'react-native'
import { Video } from 'expo-av'

 
 const LiveStreamingScreen = ({ route }) => {
    
  return (
    <View style={styles.container}>
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
        style={{ width: '100%', height: 280, marginTop: 0, zIndex: 1, backgroundColor: 'black' }}
      />
    </View>
)
}

const styles = StyleSheet.create({
avatar:{
    height:100,
    width:100,
    borderRadius:75
},

nameStyle:{
  fontSize:18,
  fontWeight:'bold'
},
container:{
    flex:1
},
button:{
  backgroundColor:'green'
}

})
  export default LiveStreamingScreen
  