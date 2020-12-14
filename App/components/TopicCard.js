import React from 'react'
import { View, Text,StyleSheet,ImageBackground} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from "../context"

const TopicCard = (props) => {

    const { ADMIN_UPLOADS_URL } = React.useContext(AuthContext)
    let image=''
    props.item.imguri ? image = ADMIN_UPLOADS_URL+ JSON.parse(props.item.imguri)[0].name:null
    console.log(22)
    return(
            <TouchableOpacity onPress={()=>{props.navigation.push('subject',{name:props.item.name,subject:props.subject,nav:props.navigation,userclass:props.userclass,syllabus:props.syllabus})}}>
                <View style={styles.container}>
                    <ImageBackground source={{uri:image}} imageStyle={{ borderRadius: 15}}  style={styles.ImageBackgroundStyle}>
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