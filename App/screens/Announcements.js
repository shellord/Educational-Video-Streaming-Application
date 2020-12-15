import React,{useState,useEffect} from 'react'
import {View,StyleSheet,ActivityIndicator} from 'react-native'
import { WebView } from 'react-native-webview'
import Firebase from '../../config/Firebase'
import { AuthContext } from "../context"

 const Profile = ({ navigation }) => {
   const { API_URL } = React.useContext(AuthContext)

   const [userclass, setUserClass] = useState()
  useEffect(() => {
    fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
      .then((response) => response.json())
      .then((json) => {
        setUserClass(json.response[0]["class"])
       
      })
      .catch((error) => {
        alert("Error!")
      })
  }, [])
    return (
        <View style={styles.container}>
         { userclass?
          <WebView
        source={{
            uri: 'http://marvelapi.ddns.net/marvelprofile/anounc/index.php?class=' + userclass
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
        />:null
          }
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
  