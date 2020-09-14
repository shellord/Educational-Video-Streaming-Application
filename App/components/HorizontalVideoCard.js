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
        height:260,
        width:150,
        marginLeft:20,
        borderWidth:0,
        borderColor:'#dddddd',
      },
      titleStyle:{
        fontSize:12
      },
      subjectText:{
        flex:1,
        paddingLeft:10,
        paddingTop:10
      },
      subjectImage:{
        flex:2,
        resizeMode:'cover',
        borderRadius:10,
        height:260,
        width:150
      },
      tagTextContainer:{
     
      },
      tagStyle:{
          marginTop:5,
          flexDirection:'row',
          alignItems:'center',
      },
      tagTextStyle:{
          color:'#607d8b',
          fontSize:12,
          backgroundColor:'#eceff1',
          borderRadius:30,
          paddingVertical:2,
          paddingHorizontal:5,
          marginRight:5   
      }
})
export default HorizontalVideoCard