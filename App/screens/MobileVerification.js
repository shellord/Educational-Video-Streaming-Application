import React from 'react'
import { StyleSheet, Text, View ,Platform} from 'react-native'
import TextBoxVerification from '../components/TextBoxVerification'

const MobileVerification = ({route}) => {
    return (
        <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.welcome}>Welcome to </Text>
        <Text style={styles.toMcl}>MCL!</Text>
        </View>
        <Text style={styles.insertYourPhone}>
        Insert the verification code to continue
        </Text>
      <TextBoxVerification verificationId={route.params.verificationId}/>
    </View>
    )
}

export default MobileVerification

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'white',
      padding:30
    },
    toMcl: {
        marginTop:30,
        fontWeight:"600",
        color: "#121212",
        fontSize: Platform.OS=='ios'?44:30 },
    welcome: {
      marginTop:30,
      fontWeight:"100",
      color: "#121212",
      fontSize: Platform.OS=='ios'?44:30,
    },
    insertYourPhone: {
      marginTop:5,
      fontSize:18,
      fontWeight:"400",
      color: "rgba(185,181,181,1)"
    },
  
  });
  