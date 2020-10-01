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
            <View style={styles.tagcontainer}>
            <View style={styles.tagTextContainer}>
                        <View style={styles.tagStyle}>
                            {props.subject?(<Text style={styles.tagTextStyle}> {props.subject.toLowerCase()}</Text>
):(<></>)}
                            {props.topic?(<Text style={styles.tagTextStyle}> {props.topic.toLowerCase()}</Text>):(<></>)}
                        </View>
            </View>  
            </View>
        </View>

      </View>
    )

}

const styles=StyleSheet.create({
    subjectList:{
        flex:1,
        height:240,
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
        flex:2,
        resizeMode:'cover',
        borderRadius:10,
        height:240,
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
          marginTop:-35
      },
      tagTextStyle:{
          color:'#607d8b',
          fontSize:12,
          backgroundColor:'#eceff1',
          paddingVertical:2,
          paddingHorizontal:5,
          marginRight:5   
      }
})
export default HorizontalVideoCard