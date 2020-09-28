import React from 'react'
import { View, Text,Image,StyleSheet} from 'react-native'

const HeaderWelcome = ({username,userimage}) => {

    return (
        <View style={styles.container}> 
            <View style={styles.userContainer}>
                 <Text style={styles.userText}>Hello</Text>  
                  <Text style={styles.userName}>{username}!</Text> 
            </View>
                <View style={styles.avatarContainer}>
                {userimage?(<Image source={{uri:userimage}} style={styles.avatar}/>):(<Image source={require('../../assets/userdefault.png')} style={styles.avatar}/>)}
                </View>
        </View>
    )
}
 
export default HeaderWelcome

const styles = StyleSheet.create({
    
    container:{
          flex:1,                   
          margin:20,
          padding:20,
          flexDirection:'row',
          backgroundColor:'#E3F2FD',
          // borderRadius:50

        },
        userContainer:{
            flex:2
    
        },
        userText:{
          fontSize:25
        },
        userName:{
          fontWeight:"bold",
          fontSize:25
        },
        avatarContainer:{
            flex:1,
            alignItems:'flex-end'
        },
        avatar:{
            flex:1,
            justifyContent:'flex-end',
            height:80,
            width:80,
            borderRadius:75
        },
})
