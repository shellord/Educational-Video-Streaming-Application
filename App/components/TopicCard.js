import React from 'react'
import { View, Text,StyleSheet,ImageBackground} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import
const TopicCard = (props) => {
    return(
            <TouchableOpacity onPress={()=>{props.navigation.push('subject',{name:props.item.name,subject:props.subject,nav:props.navigation,userclass:props.userclass})}}>
                <View style={styles.container}>
                    <ImageBackground 
                        source={{uri:props.item.imguri}}
                         imageStyle={{ borderRadius: 15}}  
                         style={styles.ImageBackgroundStyle}
                         
                         >
                        {/* <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>{props.item.name}</Text>
                        </View> */}
                    </ImageBackground>
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:15,
        // margin:5,
        padding:5,
        backgroundColor:'grey'
    
    },  
    textContainer:{
        flex:1,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        height:168
    },
    ImageBackgroundStyle:{
        width: 110, 
        height: 168,
    },
    textStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize:18
    }


})
export default TopicCard