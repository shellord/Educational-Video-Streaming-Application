import React,{useEffect,useState} from 'react'
import { View, Text,Image ,StyleSheet} from 'react-native'
import { AuthContext } from "../context"
import  Firebase from '../../config/Firebase'
import colors from '../styles/styles'

const DrawerProfile = () => {
    const {API_URL} = React.useContext(AuthContext)
    const {ASSETS_URL} = React.useContext(AuthContext)

    const [userImage, setuserImage] = useState(null)
    const [username, setusername] = useState('Jon Doe')

    useEffect(() => {
        fetch(API_URL+`/api/users/email/${Firebase.auth().currentUser.email}`)
        .then((response) => response.json())
        .then((json) => {
            setusername(json.response[0].name)
            setuserImage(ASSETS_URL+json.response[0].profile_pic)
        })
        .catch((error)=>{
    
        })
    }, [])

    return (
        <View style={styles.container}>
            {userImage?(<Image source={{uri:userImage}} style={styles.avatar}/>):(<Image source={require('../../assets/userdefault.png')} style={styles.avatar}/>)}
            <Text style={styles.userText}>{username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar:{
        height:100,
        width:100,
        borderRadius:75
    },
    userText:{
        marginTop:10,
        fontWeight:"600",
        color:colors.TEXT_COLOR
    },
    container:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        backgroundColor:colors.BACKGROUND_COLOR
        // backgroundColor:'white'
    }
    
})

export default DrawerProfile
