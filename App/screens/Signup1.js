import React,{useState,useEffect} from 'react'
import {Text,View,StyleSheet,TextInput,TouchableOpacity,Image,Alert,Keyboard,TouchableWithoutFeedback,SafeAreaView} from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import Constants from 'expo-constants'
import colors from '../styles/styles'
import { CustomPicker } from "react-native-custom-picker"
import { AuthContext } from "../context"
import { ScrollView } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker'


const Signup1 = ({navigation}) => {
    const { API_URL,signUp } = React.useContext(AuthContext)
    const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
	const [image, setimage] = useState(null)
    const [address, setaddress] = useState(null)
	const [imageUploaded, setimageUploaded] = useState(0)
	const [addressUploaded, setaddressUploaded] = useState(0)
	const [options, setoptions] = useState([{ number: "" }])
	const [selectedValue, setSelectedValue] = useState()
    const [error,setError] = useState('')
    const [date, setdate] = useState()

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
    const uploadImage = (image) => {
		let uri = image.uri
		let fileExtension = uri.substr(uri.lastIndexOf(".") + 1)

		fetch(`${API_URL}/api/upload/`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: Firebase.auth().currentUser.phoneNumber,
				imgsource: image.base64,
				imgname:
					Math.random().toString(36).substring(2, 15) +
					Math.random().toString(36).substring(2, 15) +
					"." +
					fileExtension,
			}),
		})
			.then(setimageUploaded(1))
			.catch((err) => console.log(err))
	}

	const uploadAddress = (address) => {
		fetch(`${API_URL}/api/addAddress/`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: Firebase.auth().currentUser.phoneNumber,
				address: address,
			}),
		})
			.then(setaddressUploaded(1))
			.catch((err) => console.log(err))
	}

	const submitData = () => {
		image ? uploadImage(image) : null
		address ? uploadAddress(address) : alert("Enter Valid Address!")
		imageUploaded && addressUploaded ? finishLogin() : null
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
        if(!selectedValue || !name || !email || !password || !phone || !address || !image){
            alert("You need to enter all details to complete signing up")
            return
        }
        signUp(selectedValue,name,email,password,phone,address,image)
         
    }
    return (
            <ScrollView style={styles.ScrollViewContainer} contentContainerStyle={styles.container}>
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
            {/* <Text style={{ marginTop: 30, fontSize: 12, color: "#2196f3" }}>
				Select Class
			</Text> */}

			<CustomPicker
                options={options}
                placeholder="Choose Class"
				getLabel={(item) => item.value}
				defaultValue={1}
				onValueChange={(value) => {
					setSelectedValue(value.number)
				}}
			/>

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

            
        <TextInput style={styles.inputText}                 
            onChangeText={text => setPassword(text)}    
            value={password}             
            placeholder="Password"       
            secureTextEntry={true} />     
              
        <TextInput style={styles.inputText}              
            onChangeText={text => setPhone(text)}    
            value={phone}             
			placeholder="Phone"
			keyboardType="number-pad"
        />         
		<View style={{width:'85%',marginTop:10}}>
        	<DatePicker
                style={{width: '100%'}}
                date={date}
                mode="date"
                placeholder="Date of birth"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
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
					backgroundColor:'#fafafa',
					borderColor:'#d3d3d3',

                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {setdate(date)}}
            />
			</View>
        {/* <View style={styles.textAreaContainer}>
				<TextInput
					style={styles.textArea}
					underlineColorAndroid="transparent"
					placeholder="Enter your address here"
					placeholderTextColor="grey"
					numberOfLines={5}
					multiline={true}
					textAlignVertical="top"
					onChangeText={(value) => setaddress(value)}
					value={address}
				/>
			</View>       
			 */}

        {/* <TouchableOpacity style={styles.loginButton} onPress={() => onCompleteHandler()}>           
            <Text style={styles.buttonText}>Next</Text>    
        </TouchableOpacity>   */}
		<TouchableOpacity style={styles.loginButton} onPress={() => navigation.push("Signup2",{email:email})}>           
       		 <Text style={styles.buttonText}>Next</Text>    
        </TouchableOpacity> 
        <Text style={styles.errorMessage}>{error}</Text>
        </ScrollView>
     
    )
  }

  const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
        justifyContent:'center',
        marginTop:Constants.statusBarHeight,
    },
    ScrollViewContainer:{
        flex:1,
        backgroundColor:colors.BACKGROUND_COLOR

    },
	        inputText:{
                  fontSize:12,
                  borderWidth:0.5,
                  width:'85%',
                  textAlign:'center',
                  borderColor:'#d3d3d3',
                  padding:10,
                  backgroundColor:'#fafafa',
                  marginTop:10
  
          },
          loginButton:{
                  marginTop:30,
                  width:300,
                  alignItems:'center',
                  padding:10,
                  borderRadius:5,
                  backgroundColor:'#2196f3',
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
          imageStyle: {
            width: 150,
            height: 150,
            borderRadius: 100,
            margin: 10,
        },
        imageButton: {
            color: "#1E88E5",
            margin: 10,
        },
        textAreaContainer: {
            borderColor: "grey",
            borderWidth: 1,
            borderColor:'#d3d3d3',
            margin: 10,
            width: '85%',
            
        },
        textArea: {
            height: 100,
            padding: 10,
            backgroundColor:'#fafafa'
        },
	
})

  export default Signup1