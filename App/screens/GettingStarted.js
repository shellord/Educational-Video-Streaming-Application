import React from 'react'
import { StyleSheet, Text, View,ImageBackground,TouchableOpacity } from 'react-native'
import colors from '../styles/styles'


const GettingStarted = ({navigation}) => {
    return (
        <View style={styles.container}>
             <ImageBackground source={require('../../assets/gettingstarted.png')} style={styles.image}>
                <View style={{flex:1,alignItems:'center',justifyContent: 'flex-end',marginBottom:80}}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push('Signup1')}> 
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>  
            <TouchableOpacity style={{}} onPress={() => navigation.push("Signin")}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', color: '#A9A9A9' }}>Already a member ?</Text>
                <Text style={{ fontWeight: 'bold', color: '#5f5e5e' }}> Sign In</Text>
              </View>
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
    backgroundColor:colors.BACKGROUND_COLOR        
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
