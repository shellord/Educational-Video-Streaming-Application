import * as React from "react"
import Constants from 'expo-constants'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"
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

export default function PhoneAuthScreen() {
  const recaptchaVerifier = React.useRef(null)
  const verificationCodeTextInput = React.useRef(null)
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [verificationId, setVerificationId] = React.useState("")
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
      <View style={styles.content}>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        />
        <Image source={require('../../assets/logo.jpeg')} style={styles.logo}/>
        {/* <Text style={styles.subtitle}>Welcome to,</Text> */}
        <Text style={styles.title}>Login</Text>
        
        {/* <Text style={styles.text}>Enter phone number</Text> */}
        <TextInput
          style={styles.textInput}
          // autoFocus={isConfigValid}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder="Enter Phone Number"
          editable={!verificationId}
          onChangeText={(phoneNumber) => setPhoneNumber("+91"+phoneNumber)}
        />
        <TouchableOpacity
          style={styles.appButtonContainer}
          title={`${verificationId ? "Resend" : "Send"} Verification Code`}
          disabled={!phoneNumber}
          onPress={async () => {
            const phoneProvider = new firebase.auth.PhoneAuthProvider()
            try {
              setVerifyError(undefined)
              setVerifyInProgress(true)
              setVerificationId("")
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
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
          }}
        >
           <Text style={styles.appButtonText}> {verificationId ? "Resend Verification Code" : "Send Verification Code "} </Text>
          </TouchableOpacity>
        {verifyError && (
          <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
        )}
        {verifyInProgress && <ActivityIndicator style={styles.loader} />}
        {verificationId ? (
          <Text style={styles.success}>
            A verification code has been sent to your phone
          </Text>
        ) : undefined}
        {/* <Text style={styles.text}>Enter verification code</Text> */}
        <TextInput
        autoFocus={false}
          ref={verificationCodeTextInput}
          style={styles.textInput}
          editable={!!verificationId}
          placeholder="Enter Verification Code"
          onChangeText={(verificationCode) =>
            setVerificationCode(verificationCode)
          }
        />
        <TouchableOpacity
        style={styles.appButtonContainer}
          disabled={!verificationCode}
          onPress={async () => {
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
          <Text style={styles.appButtonText}> Confirm </Text>
          </TouchableOpacity>
        {confirmError && (
          <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>
        )}
        {confirmInProgress && <ActivityIndicator style={styles.loader} />}
      </View>
      {!isConfigValid && (
        <View style={styles.overlay} pointerEvents="none">
          <Text style={styles.overlayText}>
            To get started, set a valid FIREBASE_CONFIG in App.tsx.
          </Text>
        </View>
      )}
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Constants.statusBarHeight,
    alignItems:'center',
    backgroundColor:'white'
  },
  appButtonContainer: {
    marginTop:30,
    alignItems:'center',
    paddingLeft:20,
    paddingBottom:10,
    paddingTop:10,
    paddingRight:20,
    borderRadius:5,
    backgroundColor:'#2196f3'

  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    justifyContent:'center'
  },
  content: {
    marginTop: 0, 
    alignItems:'center' 
  },
  title: {
    marginBottom: 2,
    fontSize: 0,
    fontWeight: "bold",
    letterSpacing:3
  },
  logo:{
    width:150,
    height:150,
    borderRadius:20,

  },
  subtitle: {
    marginBottom: 10,
    opacity: 1.0,
    fontWeight: "bold",
  },
  text: {
    marginTop: 30,
    marginBottom: 4,
    textAlign:"center"
  },

  textInput: {
    fontSize:16,
    borderWidth:0.5,
    textAlign:'center',
    borderColor:'#d3d3d3',
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:30,
    paddingRight:30,
    backgroundColor:'#fafafa',
    marginTop:10
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
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFFC0",
    justifyContent: 'center',
    alignItems: "center",
  },
  overlayText: {
    fontWeight: "bold",
  },
})
