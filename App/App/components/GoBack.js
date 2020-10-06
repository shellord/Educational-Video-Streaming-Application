import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'

const GoBack = ({navigation}) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style = {styles.submitButton}>
               <Text style = {styles.submitButtonText}> GO BACK </Text>
            </TouchableOpacity> 
            </View>
    )
}

export default GoBack

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        padding:10
      },
    submitButton: {
        backgroundColor: '#ef5350',
        padding: 10,
        width:330,
        borderRadius:30,    
    },
    submitButtonText:{
        padding:15,
        color: 'white',
        fontWeight:'600',
        textAlign:'center'
    }
})
