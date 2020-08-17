import React from 'react'
import { View, Text,Image ,StyleSheet} from 'react-native'

const DrawerProfile = () => {
    return (
        <View style={styles.container}>
            <Image source={{uri:'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}} style={styles.avatar}/>
            <Text>Jon Doe</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar:{
        height:100,
        width:100,
        borderRadius:75
    },
    container:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        marginTop:10
    }
    
})

export default DrawerProfile
