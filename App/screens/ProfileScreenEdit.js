import React from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

const ProfileScreenEdit = ({navigation,route}) => {
    const { editvalue } = route.params;
    
    return (
        <ScrollView style={styles.container}>
            {/* <Text style={{fontSize:14}}>Edit</Text> */}
            <View style={styles.TextInputContainer}>
            <TextInput style={styles.rightText} value={editvalue}/>
            </View>
            <TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Text style={styles.saveText}>Save your changes</Text>
            </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ProfileScreenEdit

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:15
    },
    rightText:{
        fontSize:18,
        marginTop:30,
        marginBottom:5
    },
    saveText:{
        fontSize:15,
        color:'black',
    },
    buttonContainer:{
        borderWidth:0.3,
        borderColor:'grey',
        justifyContent: 'center',
        alignItems:'center',
        height: 35,
        marginTop:20,
        borderRadius:10,
    },
    TextInputContainer:{
        borderBottomColor:'lightgrey',
        borderWidth:1,
        borderColor:'white'
    }
})
