import React,{useState} from 'react'
import {Text,TouchableOpacity,useContext,View,StyleSheet,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,TextInput} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from "../context"

const Signin = ({ navigation }) => {
    const { signIn,API_URL } = React.useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
        <View style={{marginTop:200}}>
          <TextInput style={styles.inputText}   
              placeholderTextColor="#A9A9A9"              
              onChangeText={text => setEmail(text)}    
              value={email}             
              placeholder="someone@example.com"
              keyboardType='email-address'/>  
          <TextInput style={styles.inputText} 
              placeholderTextColor="#A9A9A9"               
              onChangeText={text => setPassword(text)}    
              value={password}             
              placeholder="password"       
              secureTextEntry={true} />                
          </View>
          <View style={{flex:1,justifyContent:'flex-end'}}>
            <TouchableOpacity style={styles.loginButton} onPress={() => signIn(email,password)}>           
                <Text style={styles.buttonText}>Log In</Text>    
            </TouchableOpacity>                         
            <TouchableOpacity style={{}} onPress={() => navigation.push("Signup1")}> 
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>          
                <Text style={{ fontWeight:'bold',color:'#A9A9A9'}}>Not a member ?</Text> 
                <Text style={{ fontWeight:'bold',color:'#5f5e5e'}}> Join Now</Text>    
              </View>  
            </TouchableOpacity>  
            <TouchableOpacity onPress={() => navigation.push('ForgotPwd')}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>          
                  <Text style={{ fontWeight:'bold',color:'#EF5350'}}> Forgot Password</Text>  
               </View>  
            </TouchableOpacity>
            <Text style={styles.errorMessage}>{error}</Text>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
  }

const styles = StyleSheet.create({
          container:{
            flex:1,
            backgroundColor:'white',
            alignItems:'center'
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
                marginTop:5
          },
          loginButton:{
                  width:320,
                  alignItems:'center',
                  padding:15,
                  // backgroundColor:'#A9A9A9',
                  backgroundColor:'black',      
          },
          SignupButton:{
            width:320,
            alignItems:'center',
            padding:15,
            borderRadius:5,
            backgroundColor:'#2b96f3'
           },
          buttonText:{
                  color:'white',
                  fontWeight:'bold',
                  
          },
          signupText:{
            marginTop:10,
            textAlign:'center',
            color:'#ffcea2',
            fontWeight:'bold'
          },
          errorMessage:{
              color:'red',
              marginTop:10,
              
          }
	
})

  export default Signin