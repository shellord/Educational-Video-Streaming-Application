import React,{useState} from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { AuthContext } from "../context"
import  Firebase from '../../config/Firebase'
import firebase from 'firebase'


const ProfileScreenEdit = ({navigation,route}) => {

    const { dataToEdit } = route.params
    const [value, setValue] = useState(route.params.editvalue)
    const [password, setpassword] = useState(null)
    const { API_URL, ASSETS_URL } = React.useContext(AuthContext)

    const _onSaveHandler = () => {
        if(dataToEdit=='email'){
            var user = Firebase.auth().currentUser;

            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email, 
                password
            )

            user.reauthenticateWithCredential(credential).then(function() {
            // User re-authenticated.
            }).catch(function(error) {
            // An error happened.
            })

            user.updateEmail(value).then(function() {
            })
            .catch(function(error) {
                    alert(error)
            })
        }
        if(dataToEdit=='password'){

            if(!password){
                alert('enter current password')
                return
            }
            var user = Firebase.auth().currentUser;

            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email, 
                password
            )

            user.reauthenticateWithCredential(credential).then(function() {
                user.updatePassword(value).then(function() {
                })
                .catch(function(error) {
                        alert(error)
                })
            }).catch(function(error) {
                alert("Verification Failed!")
            })
           
            return
        }
        console.log(/^[a-zA-Z]+$/.test(value))
        if (/^[a-zA-Z]+$/.test(value) ) {

            fetch(API_URL + `/api/users/update/${dataToEdit}/${value}/${Firebase.auth().currentUser.email}`)
            .then((response) => response.json())
            .then(
                // json =>console.log(json.response.message)
                navigation.goBack(null)
            )
            .catch((error) => {
                alert(error)
            })
          }
          else{
              alert("Check your input, Only Letters allowed")
          }

    }
    return (
        <ScrollView style={styles.container}>
            {/* <Text style={{fontSize:14}}>Edit</Text> */}
            <View style={styles.TextInputContainer}>
            <TextInput style={styles.rightText}  value={value} onChangeText={text => setValue(text)} placeholder={dataToEdit=='password'?'New Password':''}/>
            </View>
            { dataToEdit=='email'?(
                <View style={styles.TextInputContainer}>
                <TextInput style={styles.rightText}  value={password} onChangeText={text => setpassword(text)} placeholder="password"/>
                </View>
            ):null
            }
            { dataToEdit=='password'?(
                <View style={styles.TextInputContainer}>
                <TextInput style={styles.rightText}  value={password} onChangeText={text => setpassword(text)} placeholder="Current Password"/>
                </View>
            ):null
            }
            <TouchableOpacity onPress={_onSaveHandler}>
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
