import React,{useState,useEffect} from 'react'
import {Text,View,StyleSheet,TextInput,TouchableOpacity,Image,Alert,Keyboard,TouchableWithoutFeedback,SafeAreaView,KeyboardAvoidingView} from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import Constants from 'expo-constants'
import colors from '../styles/styles'
import { CustomPicker } from "react-native-custom-picker"
import { AuthContext } from "../context"
import { ScrollView } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker'

const Signup1 = ({navigation}) => {

    const { API_URL } = React.useContext(AuthContext)
    const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
    const [fname,setfname] = useState('')
    const [lname,setlname] = useState('')
    const [phone,setPhone] = useState('')
	const [image, setimage] = useState(null)
	const [options, setoptions] = useState([{ number: "" }])
	const [selectedValue, setSelectedValue] = useState()
    const [error,setError] = useState('')
    const [date, setdate] = useState('')
    const [syllabus, setsyllabus  ] = useState('')
    const syllabusoption = ['scert','cbse']

	useEffect(() => {
		fetch(API_URL + "/api/class")
			.then((response) => response.json())
			.then((json) => {
				setoptions(json.response)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
	const askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
		if (permissionResult.status !== "granted") {
			Alert.alert("no permissions to access camera!", [{ text: "ok" }])
			return false
		}
		return true
    }
    
    const takeImage = async () => {
		// make sure that we have the permission
		const hasPermission = await askForPermission()
		if (!hasPermission) {
			return
		} else {
			// launch the camera with the following settings
			let image = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [3, 3],
				quality: 1,
				base64: true,
			})
			// make sure a image was taken:
			if (!image.cancelled) {
				setimage(image)
			}
		}
	}
    const onCompleteHandler = () =>{
        if(!selectedValue || !fname || !lname || !email || !password || !phone  || !image || !date){
            alert("You need to enter all details to complete signing up")
            return
        }
        navigation.push("Signup2",{email:email,fname:fname,lname:lname,password:password,phone:phone,date:date,selectedValue:selectedValue,image:image})
    }
    return (
        <KeyboardAvoidingView style={styles.container} >
   <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}> 
{/* 
              <KeyboardAvoidingView
                 behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
                 > */}

        {image ? (
				<Image source={{ uri: image.uri }} style={styles.imageStyle} />
			) : (
				<Image
					source={require("../../assets/userdefault.png")}
					style={styles.imageStyle}
				/>
			)}
            
                <TouchableOpacity onPress={takeImage}>
                    <Text style={styles.imageButton}>Choose Photo</Text>
                </TouchableOpacity>            
                <Text style={{ marginTop: 30, fontSize: 12, color: "#2196f3" }}>
                    Select Class
                </Text>
                <View style={{flexDirection:'row',width:320,justifyContent: 'space-between',}}>
                <CustomPicker
                    options={options}
                    placeholder="Choose Class"
                    getLabel={(item) => item.value}
                    // defaultValue={6}
                    onValueChange={(value) => {
                        value?setSelectedValue(value.number):null
                    }}
                />
            <CustomPicker
                options={syllabusoption}
                placeholder="Choose Syllabus"
                // defaultValue={'scert'}
                onValueChange={value => {
                    setsyllabus(value)
                }}
            />
            </View>
            <View style={{flex:1}}>
                
            <TextInput style={styles.inputText}              
                onChangeText={text => setfname(text)}    
                value={fname}             
                placeholder="First Name"
            />
            <TextInput style={styles.inputText}              
                onChangeText={text => setlname(text)}    
                value={lname}             
                placeholder="Last Name"
            />


            <TextInput style={styles.inputText}                 
                onChangeText={text => setEmail(text)}    
                value={email}             
                placeholder="someone@example.com"
                keyboardType='email-address' />  

                
            <TextInput style={styles.inputText}                 
                onChangeText={text => setPassword(text)}    
                value={password}             
                placeholder="Password"       
                secureTextEntry={true} />     
              
            <TextInput style={styles.inputText}              
                onChangeText={text => setPhone(text)}    
                value={phone}             
                placeholder="Phone Number"
                keyboardType="number-pad"
            />        
            </View> 
            <View style={{width:'80%',marginTop:10,backgroundColor:'#f3f3f4',borderRadius:10}}>
                <DatePicker
                    style={{width: '100%'}}
                    date={date}
                    mode="date"
                    placeholder="Date of birth"
                    format="YYYY-MM-DD"
                    // minDate="1990-05-01"
                    // maxDate="2022-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    // dateIcon: {
                    //     position: 'absolute',
                    //     left: 0,
                    //     top: 4,
                    //     marginLeft: 0
                    // },
                    dateInput: {
                        marginLeft: 0,
                        backgroundColor:'#f3f3f4',
                        borderColor:'transparent',
                        borderRadius:10

                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {setdate(date)}}
                />
                </View>
    
            <TouchableOpacity style={styles.loginButton} onPress={() => onCompleteHandler()}>           
                <Text style={styles.buttonText}>Next</Text>    
            </TouchableOpacity> 
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>           
                <Text style={styles.buttonText}>Back</Text>    
            </TouchableOpacity>

            <Text style={styles.errorMessage}>{error}</Text>
            </ScrollView>
            </KeyboardAvoidingView>
    )
  }

  const styles = StyleSheet.create({
	container:{
    		alignItems:'center',
             justifyContent:'center',
    },
    ScrollViewContainer:{
     
        backgroundColor:colors.BACKGROUND_COLOR,
        paddingTop:Constants.statusBarHeight
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
                backgroundColor:'#f3f3f4',
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
          backButton:{
            marginTop:10,
            width:320,
            alignItems:'center',
            padding:15,
            borderRadius:5,
            backgroundColor:'red',
        },
          buttonText:{
                  color:'white',
                  fontWeight:'bold'
          },
          errorMessage:{
              color:'red',
              marginTop:10,
              
          },
          imageStyle: {
            width: 150,
            height: 150,
            borderRadius: 30,
            margin: 10,
        },
        imageButton: {
            color: "grey",
            margin: 10,
        }
})

  export default Signup1