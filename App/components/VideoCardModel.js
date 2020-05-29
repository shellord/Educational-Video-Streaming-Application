import React from 'react'
import { View, Text ,StyleSheet,Image} from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'

const VideoCardModel = (props) => {
    console.log(props)
    return (
        <TouchableOpacity onPress={()=>props.navigation.push('chaptervideo',{name:props.title,description:props.description,url:props.url})}>
            <View style={styles.container} onPress={()=>props.navigation.push('chaptervideo',{name:props.title,description:props.description,url:props.url})}>
                <View>
                <Image source={{uri:props.image}} style={styles.imageStyle}/>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.textHeadingContainer}>
                    <Text style={styles.headingTextStyle} numberOfLines={2}>{props.title} </Text>
                    </View>
                    <View style={styles.descriptionTextContainer}>
                        <Text  style={styles.descriptionTextStyle} numberOfLines={3}>{props.description}</Text>
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
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        margin:5,
        backgroundColor:'white',
        height:150
    },
    imageStyle:{
        width:150,
        height:150
    },
    textContainer:{
        flex:1,
        margin:10

    },
    textHeadingContainer:{
        
    },
    headingTextStyle:{
        fontSize:18
    },
    descriptionTextContainer:{
        marginRight:10,
        marginTop:10,
        flex:1
    },
    descriptionTextStyle:{
        fontSize:12
    },
    tagTextContainer:{
     
    },
    tagStyle:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    },
    tagTextStyle:{
        color:'#607d8b',
        fontSize:12,
        backgroundColor:'#eceff1',
        borderRadius:100,
        padding:3,
        marginRight:5
 
    }
})


export default VideoCardModel
