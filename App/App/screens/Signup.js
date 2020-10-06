import React,{useState} from 'react'
import {Text,Button,useContext,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import { AuthContext } from "../context"


const Signup = () => {
    const { signUp } = React.useContext(AuthContext)
    const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [error,setError] = useState('')

    return (
        <View style={styles.container}>                
        <TextInput style={styles.inputText}              
            onChangeText={text => setName(text)}    
            value={name}             
            placeholder="Name"
            returnKeyType="next" />

        <TextInput style={styles.inputText}                 
            onChangeText={text => setEmail(text)}    
            value={email}             
            placeholder="Email"
            keyboardType='email-address' />  

            
        <TextInput style={styles.inputText}                 
            onChangeText={text => setPassword(text)}    
            value={password}             
            placeholder="Password"       
            secureTextEntry={true} />                
                            
        <TouchableOpacity style={styles.loginButton} onPress={() => signUp(email,password)}>           
            <Text style={styles.buttonText}>Sign Up</Text>    
        </TouchableOpacity>  
        <Text style={styles.errorMessage}>{error}</Text>
    </View>          
    )
  }

  const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	        inputText:{
                  fontSize:16,
                  borderWidth:0.5,
                  width:'85%',
                  textAlign:'center',
                  borderColor:'#d3d3d3',
                  padding:15,
                  backgroundColor:'#fafafa',
                  marginTop:10
  
          },
          loginButton:{
                  marginTop:30,
                  width:300,
                  alignItems:'center',
                  padding:10,
                  borderRadius:5,
                  backgroundColor:'#2196f3'
          },
          buttonText:{
                  color:'white',
                  fontWeight:'bold'
          },
          errorMessage:{
              color:'red',
              marginTop:10,
              
          }
	
})

  export default Signup