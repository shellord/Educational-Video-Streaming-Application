import React from 'react'
import { StyleSheet, Text, View ,TextInput ,TouchableOpacity,Platform,TouchableWithoutFeedback,Keyboard,ActivityIndicator} from 'react-native'
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
const TextBoxVerification = ({verificationId}) => {
  const recaptchaVerifier = React.useRef(null)
  const verificationCodeTextInput = React.useRef(null)
  const [verifyError, setVerifyError] = React.useState()
  const [verifyInProgress, setVerifyInProgress] = React.useState(false)
  const [verificationCode, setVerificationCode] = React.useState("")
  const [confirmError, setConfirmError] = React.useState()
  const [confirmInProgress, setConfirmInProgress] = React.useState(false)
  const isConfigValid = !!FIREBASE_CONFIG.apiKey
  console.log(verificationId)
    return (
      <TouchableWithoutFeedback 
      onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        />
        <View style={styles.SectionStyle}>
 
          <TextInput
              style={styles.inputType}
              placeholder="Enter Verification Code"
              underlineColorAndroid="transparent"
              ref={verificationCodeTextInput}
              onChangeText={(verificationCode) =>
                setVerificationCode(verificationCode)
              }
          />
 
        </View>
          <TouchableOpacity
               style = {styles.submitButton}
                 onPress={
                 async () => {
                    try {
                        setConfirmError(undefined)
                        setConfirmInProgress(true)
                        const credential = firebase.auth.PhoneAuthProvider.credential(
                          verificationId,
                          verificationCode
                        )
                        const authResult = await firebase
                          .auth()
                          .signInWithCredential(credential)
                        setConfirmInProgress(false)
                        setVerificationId("")
                        setVerificationCode("")
                        verificationCodeTextInput.current?.clear()
                      } catch (err) {
                        setConfirmError(err)
                        setConfirmInProgress(false)
                      }
                  }}
                  >
               <Text style = {styles.submitButtonText}> CONFIRM </Text>
            </TouchableOpacity>
            {verifyInProgress && <ActivityIndicator style={styles.loader} />}
 
      </View>
      </TouchableWithoutFeedback>
    )
}

export default TextBoxVerification

const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  loader: {
    marginTop: 10,
  },
  SectionStyle: {
    // marginTop:-230,
    flexDirection: 'row',
    width:330,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    borderWidth:1,
    borderBottomColor:'lightgrey',
    margin: 10
},
inputType:{
    width: 240,
    borderBottomColor:'lightgrey',
    fontSize:Platform.OS=='ios'?20:16,
    fontWeight:'600',
    margin:10,
    textAlign:'center'
},
submitButton: {
    backgroundColor: '#02c698',
    padding: 10,
    width:330,
    borderRadius:30,
    marginTop:100,
    
 },
 submitButtonText:{
     padding:15,
     color: 'white',
     fontWeight:'600',
     textAlign:'center'
 }
})