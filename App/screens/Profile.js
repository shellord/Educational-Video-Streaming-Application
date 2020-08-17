import React,{useState} from 'react'
import {Text,Button,useContext,View,Image,StyleSheet} from 'react-native'
import { AuthContext } from "../context"
import { TouchableOpacity } from 'react-native-gesture-handler'
import Firebase from '../../config/Firebase'

 const Profile = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext)
    return (
        <View style={styles.container}>
          <Image source={{uri:'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}} style={styles.avatar}/>
            <Text style={styles.nameStyle}>Jon Doe</Text> 
            <Text>{Firebase.auth().currentUser.email}</Text>
            <Text>Account Status : Free</Text> 
            <TouchableOpacity style={styles.button}  onPress={() => alert(Firebase.auth().currentUser.email)} >
              <Text>Subscribe </Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}  onPress={() => signOut()} >
              <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
  }

  const styles = StyleSheet.create({
    avatar:{
        height:100,
        width:100,
        borderRadius:75
    },
    nameStyle:{
      fontSize:18,
      fontWeight:'bold'
    },
    container:{
        flex:1,
        alignItems:'center',
        marginBottom:10,
        marginTop:10
    },
    button:{
      backgroundColor:'green'
    }
    
})

  export default Profile
  