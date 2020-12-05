import React from 'react'
import { View, Text ,StyleSheet,Image} from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../styles/styles'
import { AuthContext } from "../context"

const VideoCardModel = (props) => {
    const { ADMIN_UPLOADS_URL } = React.useContext(AuthContext)
    let imageurl=''
    props.image ? imageurl = ADMIN_UPLOADS_URL+ JSON.parse(props.image)[0].name:null
    console.log(imageurl)
    return (
        <View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('chaptervideo',{name:props.title,description:props.description,url:props.url,nav:props.navigation,isfree:props.isfree,subject:props.subject,topic:props.topic,image:props.image,id:props.id,class:props.class})}>
            <View style={styles.container} onPress={()=>props.navigation.navigate('chaptervideo',{name:props.title,description:props.description,url:props.url,nav:props.navigation,isfree:props.isfree,subject:props.subject,topic:props.topic,image:props.image,id:props.id,class:props.class})}>
                <View>
                <Image source={{uri:imageurl}} style={styles.imageStyle}/>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.textHeadingContainer}>
                    <Text style={styles.headingTextStyle} numberOfLines={2}>{props.title} </Text>
                    </View>
                    <View style={styles.descriptionTextContainer}>
                        <Text  style={styles.descriptionTextStyle} numberOfLines={2}>{props.description}</Text>
                    </View>
                    <View style={styles.tagTextContainer}>
                        <View style={styles.tagStyle}>
                            <Text style={styles.tagTextStyle}> {props.subject.toLowerCase()} </Text>
                            <Text style={styles.tagTextStyle}> {props.topic.toLowerCase()} </Text>
                        </View>
                    </View>                
                </View>
            </View>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        margin:5,
        backgroundColor:colors.BACKGROUND_COLOR,
        height:150
    },
    imageStyle:{
        width:110,
        height:140,
        borderRadius:10
    },
    textContainer:{
        flex:1,
        margin:10

    },
    textHeadingContainer:{
    
    },
    headingTextStyle:{
        fontSize:18,
        fontWeight:"600",
        marginTop:-10,
        color:colors.HEADER_TEXT_COLOR
    },
    descriptionTextContainer:{
        marginRight:10,
        marginTop:10,
        flex:1
    },
    descriptionTextStyle:{
        fontSize:12,
        color:colors.TEXT_COLOR
    },
    tagTextContainer:{
        flex:1
    },
    tagStyle:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    tagTextStyle:{
        color:'#607d8b',
        fontSize:10,
        backgroundColor:'#eceff1',
        padding:3,
        marginRight:5,
    }
})


export default VideoCardModel
