import React,{useState,useRef,useEffect} from 'react'
import {View,StyleSheet,ActivityIndicator} from 'react-native'
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'

 const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <WebView
        source={{
          uri: 'http://192.168.1.12/marvelprofile/anounc/'
        }}
        startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color='black'
              size='large'
              style={styles.flexContainer}
            />
          )}
          javaScriptEnabled={true}
          mixedContentMode='always'
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
        flex:1,

    },
    button:{
      backgroundColor:'green'
    }
    
})

  export default Profile
  