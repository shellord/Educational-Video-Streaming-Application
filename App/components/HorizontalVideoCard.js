import React from 'react'
import {Text,StyleSheet,Image,View} from 'react-native'


const HorizontalVideoCard = (props) =>{
    return(
        <View style={styles.subjectList}>
        <View style={styles.subjectImage}>
            <Image source={props.imageUri} style={styles.subjectImage}/>
        </View>
        <View style={styles.subjectText}>
            <Text numberOfLines={2} style={styles.titleStyle}>{props.name}</Text>
            {/* <View style={styles.tagcontainer}>
            <View style={styles.tagTextContainer}>
                        <View style={styles.tagStyle}>
                            {props.subject?(<Text style={styles.tagTextStyle}> {props.subject.toLowerCase()}</Text>
):(<></>)}
<Text style={styles.tagSupStyle}> • </Text>
                            {props.topic?(<Text style={styles.tagTextStyle}> {props.topic.toLowerCase()}</Text>):(<></>)}
                        </View>
            </View>  
            </View> */}
        </View>

      </View>
    )

}

const styles=StyleSheet.create({
    subjectList:{
        flex:1,
        width:110,
        marginLeft:20,
        borderWidth:0,
        borderColor:'#dddddd',
      },
      titleStyle:{
        fontSize:14,
        fontWeight:"600",
        textTransform:"capitalize",
        color:"#1A237E"
      },
      subjectText:{
        flex:1,
        paddingTop:10
      },
      subjectImage:{
        resizeMode:'cover',
        borderRadius:10,
        height:140,
        width:110
      },
      tagcontainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"flex-end"
      },
      tagTextContainer:{
        
      },
      tagStyle:{
          flexDirection:'row',
          alignItems:'center',
          marginTop:-40,
      },
      tagTextStyle:{
        fontSize:12,
        color:'tomato',
        padding:0,
        fontWeight:"600",
        textTransform:"capitalize",
      }
})
export default HorizontalVideoCard