import React from 'react'
import { StyleSheet, Text, View ,Platform,ImageBackground} from 'react-native'
import TextBoxVerification from '../components/TextBoxVerification'

const MobileVerification = ({route}) => {
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={styles.image}>
        <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.welcomeToMcl}>Welcome to </Text>
        <Text style={styles.ToMcl}>MCL!</Text>
        </View>
        <Text style={styles.insertYourPhone}>
        Insert the verification code to continue
        </Text>
      <TextBoxVerification verificationId={route.params.verificationId}/>
    </View>
    </ImageBackground>
    )
}

export default MobileVerification

const styles = StyleSheet.create({
    container: {
      flex:1,
      padding:30
    },
    welcomeToMcl: {
      marginTop:80,
      fontWeight:"100",
      color: "#121212",
      fontSize: Platform.OS === 'ios' ? 44 : 23
    },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
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
  