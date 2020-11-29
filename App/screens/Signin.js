import React,{useState} from 'react'
import {Text,TouchableOpacity,useContext,View,StyleSheet,TextInput} from 'react-native'
import { AuthContext } from "../context"

const Signin = ({ navigation }) => {
    const { signIn,API_URL } = React.useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    return (
      <>
      {/* #7f9b99
      #7f9b99
      #ffcea2 */}
      <View style={styles.container}> 
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
      <View>
      {/* <View style={{flex:1,flexDirection:'column',justifyContent: 'flex-end',}}> */}
      <TouchableOpacity style={styles.loginButton} onPress={() => signIn(email,password)}>           
          <Text style={styles.buttonText}>Log In</Text>    
      </TouchableOpacity>                         
      <TouchableOpacity style={{}} onPress={() => navigation.push("Signup1")}> 
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>          
          <Text style={{ fontWeight:'bold',color:'#A9A9A9'}}>Not a member ?</Text> 
          <Text style={{ fontWeight:'bold',color:'#5f5e5e'}}> Join Now</Text>    
        </View>  
      </TouchableOpacity>  
      <Text style={styles.errorMessage}>{error}</Text>
      </View>
      

        </View>
        </>
    )
  }

const styles = StyleSheet.create({
          container:{
            flex:1,
            alignItems:'center',
            justifyContent:'space-between',
            // backgroundColor:'#425c5a',
            // flexDirection:"column"
          },
            inputText:{
              fontSize:14,
            color:'grey',
            borderWidth:1,
            borderRadius:10,
            width:'85%',
            textAlign:'center',
            borderColor:'transparent',
            padding:15,
            width:320,
            backgroundColor:'lightgrey',
              marginTop:5
          },
          loginButton:{
                  marginTop:30,
                  width:320,
                  alignItems:'center',
                  padding:15,
                  borderRadius:5,
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
                  color:'#A9A9A9',
                  fontWeight:'bold'
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