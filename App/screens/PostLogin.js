import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,TextInput,Image} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AuthContext } from "../context"
import  Firebase from '../../config/Firebase'
import { CustomPicker } from 'react-native-custom-picker'

const PostLogin =()=> {

    const { signOut,finishLogin } = React.useContext(AuthContext)
    const {API_URL} = React.useContext(AuthContext)
    const [options, setoptions] = useState([{number:''}])
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [error,setError] = useState('')
    const [selectedValue, setSelectedValue] = useState("1");

    useEffect(() => {
      fetch(API_URL+'/api/class')
      .then((response) => response.json())
      .then((json) =>
      {
        setoptions(json.response)
      })
      .catch((error) =>{
        console.log(error)
      })
    }, [])
    const onCompleteHandler = () =>{
        
        fetch(API_URL+`/api/users/register/${name}/${email}/${Firebase.auth().currentUser.phoneNumber}/${selectedValue}/scert/`)
        .then((response) => response.json())
        .then((json) => {
            finishLogin()
        })
        .catch((error) => {
        alert(error)
        })
    }

    return (
      <View style={styles.container}> 
              <Image source={require('../../assets/logo.jpeg')} style={styles.logo}/>

         <TextInput style={styles.inputText}                 
          onChangeText={text => setName(text)}    
          value={name}             
          placeholder="Name"
           />  

      <TextInput style={styles.inputText}                 
          onChangeText={text => setEmail(text)}    
          value={email}             
          placeholder="Email"
          keyboardType='email-address' />  
          
          <Text style={{marginTop:30,fontSize:12,color:'#2196f3'}}>Select Class</Text>

        {/* <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 165 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="CLASS I" value="1" />
          <Picker.Item label="CLASS II" value="2" />
          <Picker.Item label="CLASS III" value="3" />
          <Picker.Item label="CLASS IV" value="4" />
          <Picker.Item label="CLASS V" value="5" />
          <Picker.Item label="CLASS VI" value="6" />
          <Picker.Item label="CLASS VII" value="7" />
          <Picker.Item label="CLASS VIII" value="8" />
          <Picker.Item label="CLASS IX" value="9" />
          <Picker.Item label="CLASS X" value="10" />
          <Picker.Item label="CLASS XI" value="11" />
          <Picker.Item label="CLASS XII" value="12" />
      </Picker> */}
       <CustomPicker
          options={options}
          getLabel={item => item.value}
          defaultValue={1}
          onValueChange={value => {
            setSelectedValue(value.number)
          }}
        />
             
      <TouchableOpacity style={styles.loginButton} onPress={() => onCompleteHandler()}>           
          <Text style={styles.buttonText}>Complete</Text>    
      </TouchableOpacity>                         
      <TouchableOpacity style={styles.SignupButton} onPress={() => signOut()}>           
          <Text style={styles.buttonText}>Cancel</Text>    
      </TouchableOpacity>     
      <Text style={styles.errorMessage}>{error}</Text>
        </View>
    )
  }

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
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
          SignupButton:{
            marginTop:10,
            width:300,
            alignItems:'center',
            padding:10,
            borderRadius:5,
            backgroundColor:'red'
           },
          buttonText:{
                  color:'white',
                  fontWeight:'bold'
          },
          errorMessage:{
              color:'red',
              marginTop:10,
              
          } ,
          logo:{
            width:130,
            height:130,
            borderRadius:20,
            marginBottom:50
          }
	
})


export default PostLogin