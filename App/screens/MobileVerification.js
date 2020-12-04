import React from 'react'
import { StyleSheet, Text, View ,Platform,Dimensions} from 'react-native'
import TextBoxVerification from '../components/TextBoxVerification'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../styles/styles'

const windowHeight = Dimensions.get('window').height

const MobileVerification = ({route,navigation}) => {
    return (
          <ScrollView style={styles.container}>
          {/* <ImageBackground source={require('../../assets/bg.png')} style={styles.image}> */}
          <View style={{flex:1,padding:10}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.welcomeToMcl}>Welcome to </Text>
              <Text style={styles.ToMcl}>MCL!</Text>
            </View>
            <Text style={styles.insertYourPhone}>
            Insert the verification code to continue
            </Text> 
            <TextBoxVerification verificationId={route.params.verificationId} navigation={navigation}/>
          </View>
        {/* </ImageBackground> */}
    </ScrollView>


    )
}

export default MobileVerification

const styles = StyleSheet.create({
    container: {
	  flex:1,
	  backgroundColor:colors.BACKGROUND_COLOR
    },
    welcomeToMcl: {
      marginTop:80,
      fontWeight:"100",
      color: "#121212",
      fontSize: Platform.OS === 'ios' ? 44 : 23
    },
  image: {
    flex: 1,
    height:windowHeight,
    resizeMode: "cover",
    justifyContent: "center"
  },
    ToMcl: {
    marginTop:80,
    fontWeight:Platform.OS=='ios'?"600":"700",
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
  