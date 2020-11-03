import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Image, Keyboard} from 'react-native'
import { TextInput, TouchableOpacity, TouchableFeedback, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants'
import TextBox from '../components/TextBox';
import { AuthContext } from "../context"
import  Firebase from '../../config/Firebase'
import { useIsFocused } from '@react-navigation/native'


const ProfileScreen = ({navigation,route}) => {

    const { API_URL, ASSETS_URL } = React.useContext(AuthContext)
    const [name, setname] = useState("")
    const [address, setaddress] = useState("")
    const [phone, setphone] = useState("")
    const [userimage, setuserimage] = useState(null)
    const [subscibtionstatus, setsubscibtionstatus] = useState(null)
    

    useEffect(() => {
        fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
        .then((response) => response.json())
        .then((json) => {
            setaddress(json.response[0].address)
            setname(json.response[0].name)
            setuserimage(ASSETS_URL + json.response[0].profile_pic)
            setsubscibtionstatus(json.response[0].subscription_status)
            setphone(json.response[0].phone)
        })
        .catch((error) => {
            alert(error)
        })
    }, [])
    
    if(useIsFocused()){
        fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
        .then((response) => response.json())
        .then((json) => {
            setaddress(json.response[0].address)
            setname(json.response[0].name)
            setuserimage(ASSETS_URL + json.response[0].profile_pic)
            setsubscibtionstatus(json.response[0].subscription_status)
            setphone(json.response[0].phone)
        })
        .catch((error) => {
            alert(error)
        })
    }

    return (
        
        <ScrollView  style={styles.container}>
            {/* <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}> */}
           <View style={styles.avatarContainer}>
				{userimage ? (
					<Image source={{ uri: userimage }} style={styles.avatar} />
				) : (
					<Image
					source={require("../../assets/userdefault.png")}
					style={styles.avatar}
					/>
					)}
                    <Text style={styles.avatarText}>Change Profile Photo</Text>
            </View>
            
            <View style={styles.detailsContainer}>
            <View>
                <Text style={styles.leftText}>
                    Name
                </Text>
                <Text style={styles.leftText}>
                    Email
                </Text>
                <Text style={styles.leftText}>
                    Password
                </Text>
                <Text style={styles.leftText}>
                    Phone
                </Text>
                <Text style={styles.leftText}>
                Address
                </Text>
            </View>
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreenEdit',{editvalue:name,dataToEdit:'name'})}>
                <Text style={styles.rightText} >{name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreenEdit',{editvalue:Firebase.auth().currentUser.email,dataToEdit:'email'})}>
                <Text style={styles.rightText} numberOfLines={1}>{Firebase.auth().currentUser.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreenEdit',{editvalue:'',dataToEdit:'password'})}>
                <Text style={styles.rightText} >*********</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreenEdit',{editvalue:phone,dataToEdit:'phone'})}>
                <Text style={styles.rightText} >{phone}</Text>
                </TouchableOpacity>
                <View style={{width:200}}>
                <Text style={styles.rightText} numberOfLines={5}>{address}</Text>
                </View>
            </View>
            </View>
            {/* </TouchableWithoutFeedback> */}
        </ScrollView>
        
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop:Constants.statusBarHeight,
        backgroundColor:'white',
    },
	avatarContainer: {
		// flex: 1,
		alignItems: "center",
		// padding: 10,
		justifyContent: 'center',
	},
	avatar: {
		// flex: 1,
		justifyContent: "flex-end",
		height: 100,
		width: 100,
		borderRadius: 75,
    },
    avatarText:{
        color:'#1E88E5',
        fontSize:15,
        marginTop:4,
        fontWeight:"500"
    },
    detailsContainer:{  
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between',
        padding:20,
    },
    leftText:{
        fontSize:16,
        marginTop:30,
    },
    rightText:{
        fontSize:16,
        marginTop:30,
        marginLeft:10
    }
})
