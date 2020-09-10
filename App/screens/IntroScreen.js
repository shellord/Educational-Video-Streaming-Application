import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { AsyncStorage } from 'react-native'
import { AuthContext } from "../context"

const data = [
  {
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/logo.jpeg'),
    bg: '#59b2ab',
  },
  {
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/logo.jpeg'),
    bg: '#febe29',
  },
  {
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../assets/logo.jpeg'),
    bg: '#22bcb5',
  },
]


const IntroScreen = () => {
    const {IntroDone} = React.useContext(AuthContext)
    const _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-arrow-round-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        )
      }

     const  _renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-checkmark"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        )
      }

  const _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    )
  }


return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={(item)=>(item.title)}
          renderItem={_renderItem}
          data={data}
          renderDoneButton={_renderDoneButton}
          renderNextButton={_renderNextButton}
          onDone={IntroDone}
        />
      </View>
    ) 
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
    },
    image: {
      width: 320,
      height: 320,
      marginVertical: 32,
    },
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
    },
  })

export default IntroScreen