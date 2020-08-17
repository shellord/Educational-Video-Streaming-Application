import React from 'react'
import {Text,StyleSheet,Image,View} from 'react-native'


const HorizontalVideoCard = (props) =>{
    return(
        <View style={styles.subjectList}>
        <View style={styles.subjectImage}>
            <Image source={props.imageUri} style={styles.subjectImage}/>
        </View>
        <View style={styles.subjectText}>
            <Text numberOfLines={1}>{props.name}</Text>
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
        height:230,
        width:230,
        marginLeft:20,
        borderWidth:0,
        borderColor:'#dddddd'
      },

      subjectText:{
        flex:1,
        paddingLeft:10,
        paddingTop:10
      },
      subjectImage:{
        flex:2,
        resizeMode:'cover'
      },
      tagTextContainer:{
     
      },
      tagStyle:{
          marginTop:5,
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
export default HorizontalVideoCard