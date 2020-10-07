import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import TextBox from '../components/TextBox'

const MobileLogin = ({navigation}) =>{
    return (
      // <ImageBackground source={require('../../assets/bg.png')} style={styles.image}>
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.welcomeToMcl}>Welcome to </Text>
        <Text style={styles.ToMcl}>MCL!</Text>
        </View>
          <Text style={styles.insertYourPhone}>
            Insert your phone number to continue
          </Text>
        <TextBox navigation={navigation}/>
       
    </View>
    //  </ImageBackground>
    )
  }

export default MobileLogin
const styles = StyleSheet.create({
  container: {
    flex:1,
    // backgroundColor:'white',
    padding:30
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  welcomeToMcl: {
    marginTop:80,
    fontWeight:"100",
    color: "#121212",
    fontSize: Platform.OS === 'ios' ? 44 : 23
  },
  ToMcl: {
    marginTop:80,
    fontWeight:"600",
    color: "#121212",
    fontSize: Platform.OS === 'ios' ? 44 : 23
  },
  insertYourPhone: {
    marginTop:5,
    fontSize:18,
    fontWeight:"400",
    color: "rgba(185,181,181,1)"
  },

});
