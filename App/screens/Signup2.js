import React,{useState} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Constants from 'expo-constants'
import colors from '../styles/styles'
import { AuthContext } from "../context"


const Signup2 = ({navigation,route}) => {

    const { signUp } = React.useContext(AuthContext)
    const [school, setschool] = useState('')
    const [street, setstreet] = useState('')
    const [pincode, setpincode] = useState('')
    const [city, setcity] = useState('')
    const [address, setaddress] = useState('')

    const onCompleteHandler = () => {
        let selectedValue = route.params.selectedValue    
        let fname = route.params.fname
        let lname = route.params.lname
        let date = route.params.date
        let email = route.params.email
        let password = route.params.password
        let phone = route.params.phone
        let image = route.params.image
        let syllabus = route.params.syllabus
        if(!school || !street || !pincode || !city || !address || !address ){
            alert("You need to enter all details to complete signing up")
            return
        }

        signUp(selectedValue,fname,lname,date,email,password,phone,address,image,school,street,city,pincode,syllabus)    
    }

    return (
        // <ScrollView style={styles.ScrollViewContainer} contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >

            <TextInput style={styles.inputText}              
                onChangeText={text => setschool(text)}    
                value={school}             
                placeholder="School Name"
            />
            <TextInput style={styles.inputText}              
                onChangeText={text => setaddress(text)}    
                value={address}             
                placeholder="Address"
            />
             <TextInput style={styles.inputText}              
                onChangeText={text => setstreet(text)}    
                value={street}             
                placeholder="Street Name"
            />
            <TextInput style={styles.inputText}              
                onChangeText={text => setcity(text)}    
                value={city}             
                placeholder="City"
            />
              <TextInput style={styles.inputText}              
                onChangeText={text => setpincode(text)}    
                value={pincode}             
                placeholder="Pincode"
                keyboardType={"number-pad"}
            />
        <TouchableOpacity style={styles.loginButton} onPress={()=>onCompleteHandler()}>           
       		 <Text style={styles.buttonText}>Sign Up</Text>    
        </TouchableOpacity> 
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>           
       		 <Text style={styles.buttonText}>Back</Text>    
        </TouchableOpacity>
        {/* </ScrollView> */}
        </KeyboardAvoidingView>
    )

}

export default Signup2

const styles = StyleSheet.create({
    container:{
		flex:1,
		alignItems:'center',
        justifyContent:'center',
        marginTop:Constants.statusBarHeight,
        backgroundColor:colors.BACKGROUND_COLOR
    },
    ScrollViewContainer:{
        flex:1,
        backgroundColor:colors.BACKGROUND_COLOR

    },
	        inputText:{
                fontSize: 14,
                color: 'grey',
                borderWidth: 1,
                width: '85%',
                textAlign: 'left',
                borderColor: 'black',
                borderTopColor: 'transparent',
                borderLeftWidth: 0,
                borderRightWidth: 0,
                padding: 15,
                width: 320,
                backgroundColor: 'transparent',
                marginTop: 5
  
          },
          loginButton:{
            marginTop:30,
            width:320,
            alignItems:'center',
            padding:15,
            borderRadius:5,
            // backgroundColor:'#A9A9A9',
            backgroundColor:'black',
          marginBottom:10
          },
          backButton:{
            // marginTop:30,
                    width:320,
                    alignItems:'center',
                    padding:15,
                    borderRadius:5,
                    // backgroundColor:'#A9A9A9',
                    backgroundColor:'red',
                  marginBottom:10
        },
          buttonText:{
                  color:'white',
                  fontWeight:'bold'
          },
          errorMessage:{
              color:'red',
              marginTop:10,
              
          },

	
})
