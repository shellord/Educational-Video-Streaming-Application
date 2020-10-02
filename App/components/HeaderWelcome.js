import React from 'react'
import { View, Text,Image,StyleSheet,Platform} from 'react-native'
import colors from '../styles/styles'

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
          padding:10,
          flexDirection:'row',
        //   backgroundColor:'#E3F2FD',
          // borderRadius:50

        },
        userContainer:{
            flex:2,
            height:70,
        },
        userText:{
            fontSize: Platform.OS === 'ios' ? 44 : 25,
            color:colors.TEXT_COLOR
            
        },
        userName:{
          fontWeight:Platform.OS === 'ios' ? "600" : "700",
          fontSize: Platform.OS === 'ios' ? 44 : 25,
          color:colors.TEXT_COLOR
        },
        avatarContainer:{
            flex:1,
            alignItems:'flex-end',
            padding:10
        },
        avatar:{
            flex:1,
            justifyContent:'flex-end',
            height:60,
            width:60,
            borderRadius:75
        },
})
