import React from 'react'
import {View,StyleSheet,ActivityIndicator,Dimensions,TouchableOpacity,Text} from 'react-native'
import { WebView } from 'react-native-webview'
import  Firebase from '../../config/Firebase'
import colors from '../styles/styles'
import { AuthContext } from "../context"

const { width, height } = Dimensions.get('window')

 const Profile = ({ navigation }) => {
    const {signOut} = React.useContext(AuthContext)

    return (
        // <View style={styles.container}>
        //   <Image source={{uri:'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}} style={styles.avatar}/>
        //     <Text style={styles.nameStyle}>Jon Doe</Text> 
        //     <Text>{Firebase.auth().currentUser.email}</Text>
        //     <Text>Account Status : Free</Text> 
        //     <TouchableOpacity style={styles.button}  onPress={() => alert(Firebase.auth().currentUser.email)} >
        //       <Text>Subscribe </Text> 
        //     </TouchableOpacity>

        // </View>

        <View style={styles.container}>
          <View style={styles.webviewStyle}>
            <WebView
              source={{
               uri: `http://18.219.43.140/marvelprofile/index.php`
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
        </View>
    )
  }

  const styles = StyleSheet.create({
    avatar:{
        height:100,
        width:100,
        borderRadius:75
    },
    webviewStyle:{
      flex:1
    },
    nameStyle:{
      fontSize:18,
      fontWeight:'bold'
    },
    container:{
        flex:1,
        backgroundColor:'white'
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

  export default Profile
  