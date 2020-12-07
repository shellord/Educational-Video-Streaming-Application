import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from "../context"

const ForgotPwd = ({navigation}) => {

	const { passwordReset } = React.useContext(AuthContext)

    const [email, setemail] = useState('')

    const onResetHandler = (email) =>{
            Alert.alert(
                "Reset Passowrd",
                "A password reset email has been sent to your registered email.",
        [
          { text: "Ok", onPress: () => navigation.goBack() },
        ]
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
           <TextInput style={styles.inputText}   
              placeholderTextColor="#A9A9A9"              
              onChangeText={text => setemail(text)}    
              value={email}             
              placeholder="someone@example.com"
              keyboardType='email-address'/>  
            <TouchableOpacity style={styles.loginButton} onPress={() => passwordReset(email)}>           
                <Text style={styles.buttonText}>Reset Password</Text>    
            </TouchableOpacity>   
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>           
                <Text style={styles.buttonText}>Back</Text>    
            </TouchableOpacity>  
      </ScrollView>
    )
}

export default ForgotPwd

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    inputText:{
              fontSize:14,
              color:'grey',
              borderWidth:1,
              width:'85%',
              textAlign:'left',
              borderColor:'black',
              borderTopColor:'transparent',
              borderLeftWidth:0,
              borderRightWidth:0,
              padding:15,
              width:320,
              backgroundColor:'transparent',
          },
    loginButton:{
                  width:320,
                  alignItems:'center',
                  padding:15,
                  marginTop:50,
                  backgroundColor:'black',      
          },
              backButton:{
                  width:320,
                  alignItems:'center',
                  padding:15,
                  marginTop:10,
                  backgroundColor:'black',      
          },
          buttonText:{
                  color:'white',
                  fontWeight:'bold',
                  
          }
})
