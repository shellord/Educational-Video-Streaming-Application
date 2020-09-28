import React from 'react'
import {Text,StyleSheet,Image,View} from 'react-native'


const Category = (props) =>{

    return(
        <View style={styles.subjectList}>
        <View style={styles.subjectImage}>
            <Image source={props.imageUri} style={styles.subjectImage}/>
        </View>
        <View style={styles.subjectText}>
            <Text>{props.name}</Text>
        </View>
      </View>
    )
}

const styles=StyleSheet.create({
    subjectList:{
        height:110,
        width:140,
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
        borderRadius:10,
        resizeMode:'cover'
      }
})
export default Category