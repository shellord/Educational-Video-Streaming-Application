import React from 'react'
import { View, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Text, Share, Button } from 'react-native'
import { WebView } from 'react-native-webview'
import Firebase from '../../config/Firebase'
import colors from '../styles/styles'
import { AuthContext } from "../context"

const { width, height } = Dimensions.get('window')

const Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext)

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Download Marvel Creative Learning Application from https://www.google.com/',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

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
      <View style={{ marginTop: 10 }}>
        <Button onPress={onShare} title="Share with your friends" />
      </View>
      <View style={styles.webviewStyle}>
        <WebView
          source={{
            uri: `http://3.21.140.198/marvelprofile/index.php?email=${Firebase.auth().currentUser.email}`
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
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 75
  },
  webviewStyle: {
    flex: 1
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    alignItems: 'flex-end'
  },
  button: {

  },
  textStyle: {
    fontSize: 16,
    color: 'black'
  }

})

export default Profile
