import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextBox from '../components/TextBox'

const MobileLogin = ({navigation}) =>{
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeToMcl}>Welcome to MCL!</Text>
          <Text style={styles.insertYourPhone}>
            Insert your phone number to continue
          </Text>
        <TextBox navigation={navigation}/>
    </View>
    )
  }

export default MobileLogin
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    padding:30
  },
  welcomeToMcl: {
    marginTop:30,
    fontWeight:"600",
    color: "#121212",
    fontSize: 23,
  },
  insertYourPhone: {
    marginTop:5,
    fontSize:18,
    fontWeight:"400",
    color: "rgba(185,181,181,1)"
  },

});
