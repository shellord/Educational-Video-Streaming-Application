import React,{useState,useRef,useEffect} from 'react'
import {View,StyleSheet,ActivityIndicator} from 'react-native'
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'
import  Firebase from '../../config/Firebase'

 const Profile = ({ navigation }) => {

    return (
        // <View style={styles.container}>
        //   <Image source={{uri:'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}} style={styles.avatar}/>
        //     <Text style={styles.nameStyle}>Jon Doe</Text> 
        //     <Text>{Firebase.auth().currentUser.email}</Text>
        //     <Text>Account Status : Free</Text> 
        //     <TouchableOpacity style={styles.button}  onPress={() => alert(Firebase.auth().currentUser.email)} >
        //       <Text>Subscribe </Text> 
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.button}  onPress={() => signOut()} >
        //       <Text>Sign Out</Text>
        //     </TouchableOpacity>
        // </View>

        <View style={styles.container}>
          <WebView
          source={{
            uri: `http://18.223.24.160/marvelprofile//index.php?phone=${Firebase.auth().currentUser.phoneNumber.substring(1)}`
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
  