import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Alert, Text, ScrollView } from 'react-native'
import { Video } from 'expo-av'
import { AuthContext } from '../context'
import Firebase from '../../config/Firebase'
import colors from '../styles/styles'


const LiveStreamingScreen = ({ route }) => {

  const [subscriptionStatus, setsubscriptionStatus] = useState(null)
  const { API_URL } = React.useContext(AuthContext)

  useEffect(() => {
    fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
      .then((response) => response.json())
      .then((json) => {
        setsubscriptionStatus(json.response[0].subscription_status)
        if (subscriptionStatus == 0 && !route.params.isfree) {
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

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.description}>
        <View style={styles.titleContainer}>

          <Text style={styles.videoTitle}>{route.params.name}</Text>
          <View style={styles.tagTextContainer}>
            <Text style={styles.tagDescstyle}>
              {route.params.description}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 75
  },

  nameStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_COLOR
  },
  button: {
    backgroundColor: 'green'
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
    color: colors.HEADER_TEXT_COLOR
  },
  titleContainer: {
    flex: 1,
    padding: 15,
  },
  tagSupStyle: {
    fontSize: 23,
    // color:"#607d8b"
    color: "tomato"

  },
  tagDescstyle: {
    marginBottom: 0,
    fontSize: 15,
    color: colors.TEXT_COLOR
  },
  tagTextContainer: {
    marginTop: 0,
    alignItems: 'flex-start'
  },
  tagStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: -2
  },
  tagTextStyle: {
    // color:'#607d8b',
    color: 'tomato',
    fontSize: 14,
    // backgroundColor:'#eceff1',
    borderRadius: 100,
    padding: 0,
    marginRight: 5,
    fontWeight: "600",
    textTransform: "capitalize",
  }

})
export default LiveStreamingScreen
