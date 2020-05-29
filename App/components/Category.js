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
        height:130,
        width:130,
        marginLeft:20,
        borderWidth:0.5,
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
      }
})
export default Category