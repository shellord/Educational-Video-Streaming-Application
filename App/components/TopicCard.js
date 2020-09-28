import React from 'react'
import { View, Text,StyleSheet,ImageBackground} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TopicCard = (props) => {
    return(
            <TouchableOpacity onPress={()=>{props.navigation.push('subject',{name:props.item.name,subject:props.subject,nav:props.navigation,userclass:props.userclass})}}>
                <View style={styles.container}>
                    <ImageBackground source={{uri:props.item.imguri}} style={styles.ImageBackgroundStyle} resizeMode='contain'>
                        <View style={styles.textContainer}>
                            {/* <Text style={styles.textStyle}>{props.item.name}</Text> */}
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:10,
        padding:1,
        // backgroundColor:'tomato',
    },  
    textContainer:{
        flex:1,
        margin:10,
        height:280
    },
    ImageBackgroundStyle:{
        width: '100%', 
        height: '100%',
    },
    textStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize:18
    }


})
export default TopicCard