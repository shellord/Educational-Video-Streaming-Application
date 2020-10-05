import React, { useState } from 'react'
import { StyleSheet, Text, View ,TextInput ,TouchableOpacity,Image,Keyboard,TouchableWithoutFeedback} from 'react-native'
import * as FirebaseRecaptcha from "expo-firebase-recaptcha"
import * as firebase from "firebase"


// PROVIDE VALID FIREBASE CONFIG HERE
// https://firebase.google.com/docs/web/setup
const FIREBASE_CONFIG = {
 
  apiKey: "AIzaSyAQT5HpICWK7Rc1Av4Jo4hVLAr4cmSV05o",
  authDomain: "marvel-884ea.firebaseapp.com",
  databaseURL: "https://marvel-884ea.firebaseio.com",
  projectId: "marvel-884ea",
  storageBucket: "marvel-884ea.appspot.com",
  messagingSenderId: "957738891750",
  appId: "1:957738891750:web:e25d6ad991558dc398fe27",
  measurementId: "G-WCBXVWLS6R"
}
try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG)
  }
} catch (err) {
  // ignore app already initialized error on snack
}
const TextBox = ({navigation}) => {
  
    const recaptchaVerifier = React.useRef(null)
    const verificationCodeTextInput = React.useRef(null)
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [verificationId, setVerificationId] = React.useState(null)
    const [verifyError, setVerifyError] = React.useState()
    const [verifyInProgress, setVerifyInProgress] = React.useState(false)
    const [verificationCode, setVerificationCode] = React.useState("")
    const [confirmError, setConfirmError] = React.useState()
    const [confirmInProgress, setConfirmInProgress] = React.useState(false)
    const isConfigValid = !!FIREBASE_CONFIG.apiKey

    return (
      <TouchableWithoutFeedback 
      onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        />
          <View style={styles.SectionStyle}>
  
          <Image source={require('../../assets/india.png')} style={styles.ImageStyle} />
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
                style={styles.inputType}
                placeholder="9876543210"
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                underlineColorAndroid="transparent"
                value={phoneNumber}
                onChangeText={(value) => setPhoneNumber(value)}
            />
  
          </View>
          <TouchableOpacity
                onPress={
                  async () => {
                    if(phoneNumber){
                    const phoneProvider = new firebase.auth.PhoneAuthProvider()
                    try {
                      setVerifyError(undefined)
                      setVerifyInProgress(true)
                      setVerificationId(null)
                      const verificationId = await phoneProvider.verifyPhoneNumber(
                        '+91'+phoneNumber,
                        // @ts-ignore
                        recaptchaVerifier.current
                      )
                      setVerifyInProgress(false)
                      setVerificationId(verificationId)
                      verificationCodeTextInput.current?.focus()
                    } catch (err) {
                      setVerifyError(err)
                      setVerifyInProgress(false)
                    }
                  }
                  else{
                    alert('You need to enter a mobile number')

                  }
                }
                
                }
               style = {styles.submitButton}>
               <Text style = {styles.submitButtonText}> SEND VERIFICATION CODE </Text>
             
            </TouchableOpacity>
        

            {verificationId ? (navigation.push('MobileVerification',{verificationId:verificationId})) : undefined}
            {verifyError && (
            <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
            // <Text style={styles.error}>{`Error`}</Text>

              )}

            
 
      </View>
      </TouchableWithoutFeedback>
    )
    
}

export default TextBox

const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
  success: {
    marginTop: 10,
    fontWeight: "bold",
    color: "blue",
  },
  SectionStyle: {
    flexDirection: 'row',
    width:330,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    borderColor: 'transparent',
    borderWidth:1,
    borderBottomColor:'lightgrey',
    margin: 10
},
inputType:{
    width: 240,
    borderBottomColor:'lightgrey',
    fontSize:20,
    fontWeight:'600',
    margin:10,
    // textAlign:'center'
},
ImageStyle: {
    margin: 5,
    height: 40,
    width: 40,
    borderRadius:20,
    resizeMode : 'stretch',
    alignItems: 'center'
},
submitButton: {
    backgroundColor: '#02c698',
    padding: 10,
    width:330,
    borderRadius:30,
    marginTop:100
 },
 submitButtonText:{
     padding:15,
     color: 'white',
     fontWeight:'600'
 },
 countryCode:{
  borderBottomColor:'lightgrey',
  fontSize:20,
  fontWeight:'600',
 }
})