import React,{useState} from 'react'
import {Text,Button,useContext,View} from 'react-native'
import { AuthContext } from "../context"

 
 const Profile = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext)
    
    return (
        <View>
        <Text>Profile Screen</Text>
        <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
        <Button title="Sign Out" onPress={() => signOut()} />
        </View>
    )
  }

  export default Profile
  