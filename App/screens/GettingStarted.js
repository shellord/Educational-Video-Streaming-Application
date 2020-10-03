import React from 'react'
import { StyleSheet, Text, View,ImageBackground,TouchableOpacity } from 'react-native'
import colors from '../styles/styles'

const GettingStarted = () => {
    return (
        <View style={styles.container}>
             <ImageBackground source={require('../../assets/get.png')} style={styles.image}>
                <View style={{flex:1,alignItems:'center',justifyContent: 'flex-end',marginBottom:80}}>
                  <TouchableOpacity style={styles.button}> 
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>  
                </View>
            </ImageBackground>
        </View>
    )
}

export default GettingStarted

const styles = StyleSheet.create({
    container:{
    flex:1,
    backgroundColor:'white'        
},
image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#171717",
    padding: 20,
    width:300,
    borderRadius:30
  },
  buttonText:{
    color:'white'
  }
})
