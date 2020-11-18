import React from 'react'
import {View,StyleSheet,ActivityIndicator,Dimensions,TouchableOpacity,Text,Button} from 'react-native'
import { WebView } from 'react-native-webview'
import colors from '../styles/styles'
import { AuthContext } from "../context"

const { width, height } = Dimensions.get('window')

 const LiveStreamingScreen = ({ nav }) => {
    
    return (
        <View style={styles.container}>
          <View style={styles.webviewStyle}>
          
          <Text style={{fontSize:24,marginTop:10,marginBottom:10,fontWeight:"600"}}> Live Streaming Title </Text>
          <Text style={{marginLeft:5,marginBottom:10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          
          <WebView

          scalesPageToFit={true}
          bounces={false}
          javaScriptEnabled
          style={{ height: 100, }}
          source={{
            html: `
                  <!DOCTYPE html>
                  <html>
                  <body>
                  <iframe width="100%" height="500" src="https://www.youtube.com/embed/bmVKaAV_7-A?controls=0?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </body>
                  </html>
                  `,
          }}
          automaticallyAdjustContentInsets={false}
          />
          </View>
          </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:5
    },
    avatar:{
        height:100,
        width:100,
        borderRadius:75
    },
    webviewStyle:{
      flex:1,
    },
    nameStyle:{
      fontSize:18,
      fontWeight:'bold'
    },
    buttonContainer:{
      alignItems:'flex-end'
    },
    button:{
      
    },
    textStyle:{
      fontSize:16,
      color:'black'
    }
    
})

  export default LiveStreamingScreen
  