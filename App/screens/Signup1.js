import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import Constants from 'expo-constants'
import colors from '../styles/styles'
import { CustomPicker } from "react-native-custom-picker"
import { AuthContext } from "../context"
import { ScrollView } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker'
import { ThemeContext } from 'react-native-elements'

const Signup1 = ({ navigation }) => {

    const { API_URL } = React.useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setimage] = useState(null)
    const [options, setoptions] = useState([{ number: "" }])
    const [selectedValue, setSelectedValue] = useState()
    const [error, setError] = useState('')
    const [date, setdate] = useState('')
    const [syllabus, setsyllabus] = useState('')
    const syllabusoption = ['scert', 'cbse']

    useEffect(() => {
        fetch(API_URL + "/api/class")
            .then((response) => response.json())
            .then((json) => {
                setoptions(json.response)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    const askForPermission = async () => {
        const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
        if (permissionResult.status !== "granted") {
            Alert.alert("no permissions to access camera!", [{ text: "ok" }])
            return false
        }
        return true
    }



    const takeImage = async () => {
        // make sure that we have the permission
        const hasPermission = await askForPermission()
        if (!hasPermission) {
            return
        } else {
            // launch the camera with the following settings
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
                base64: true,
            })
            // make sure a image was taken:
            if (!image.cancelled) {
                setimage(image)
            }
        }
    }
    const onCompleteHandler = () => {

        // if (!/^[a-zA-Z]+$/.test(lname) || !/^[a-zA-Z]+$/.test(fname)) {
        //     alert("use only valid characters!")
        //     return
        // }
        // if (fname.length < 3) {
        //     alert("You need atleast 3 letters for First name")
        //     return
        // }
        // if (lname.length < 3) {
        //     alert("You need atleast 3 letters for Last name")
        //     return
        // }
        // if (phone.length != 10) {
        //     alert("Your phone number is not valid")
        //     return
        // }
        // if (!selectedValue || !lname || !email || !password || !phone || !image || !date || !syllabus) {
        //     alert("You need to enter all details to complete signing up")
        //     return
        // }

        navigation.push("Signup2", { email: email, fname: fname, lname: lname, password: password, phone: phone, date: date, selectedValue: selectedValue, image: image, syllabus: syllabus })
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <KeyboardAvoidingView keyboardVerticalOffset="100"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      > */}
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <>
                    {image ? (
                        <Image source={{ uri: image.uri }} style={styles.imageStyle} />
                    ) : (
                            <Image
                                source={require("../../assets/userdefault.png")}
                                style={styles.imageStyle}
                            />
                        )}

                    <TouchableOpacity onPress={takeImage}>
                        <Text style={styles.imageButton}>Choose Photo</Text>
                    </TouchableOpacity>
                    {/* <Text style={{ marginTop: 30, fontSize: 12, color: "#2196f3" }}>
				Select Class
			</Text> */}
                    <View style={{ flexDirection: 'row', width: 320, justifyContent: 'space-between', }}>
                        <CustomPicker
                            options={options}
                            placeholder="Choose Class"
                            getLabel={(item) => item.value}
                            // defaultValue={6}
                            onValueChange={(value) => {
                                value ? setSelectedValue(value.number) : null
                            }}
                        />
                        <CustomPicker
                            options={syllabusoption}
                            placeholder="Choose Syllabus"
                            // defaultValue={'scert'}
                            onValueChange={value => {
                                setsyllabus(value)
                            }}
                        />
                    </View>
                    <TextInput style={styles.inputText}
                        onChangeText={text => setfname(text.replace(/['"]+/g, ''))}
                        value={fname}
                        placeholder="First Name"
                    />
                    <TextInput style={styles.inputText}
                        onChangeText={text => setlname(text.replace(/['"]+/g, ''))}
                        value={lname}
                        placeholder="Last Name"
                    />


                    <TextInput style={styles.inputText}
                        onChangeText={text => setEmail(text.replace(/['"]+/g, ''))}
                        value={email}
                        placeholder="someone@example.com"
                        keyboardType='email-address' />


                    <TextInput style={styles.inputText}
                        onChangeText={text => setPassword(text.replace(/['"]+/g, ''))}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true} />

                    <TextInput style={styles.inputText}
                        onChangeText={text => setPhone(text.replace(/['"]+/g, ''))}
                        value={phone}
                        placeholder="Phone Number"
                        keyboardType="number-pad"
                    />
                    <View style={{ width: "80%", marginTop: 10, backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }}>
                        <DatePicker
                            style={{ width: 320 }}
                            placeholder="Date of birth"
                            date={date}
                            mode="date"
                            format="YYYY-MM-DD"
                            // minDate="1990-05-01"
                            // maxDate="2022-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                // dateIcon: {
                                //     position: 'absolute',
                                //     left: 0,
                                //     top: 4,
                                //     marginLeft: 0
                                // },
                                dateInput: {
                                    marginLeft: 0,
                                    backgroundColor: 'white',
                                    borderColor: 'transparent',
                                    borderRadius: 10

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { setdate(date) }}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={() => onCompleteHandler()}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>           
       		 <Text style={styles.buttonText}>Back</Text>    
        </TouchableOpacity> */}
                    <Text style={styles.errorMessage}>{error}</Text>
                    {/* <View style={{marginBottom:"50%"}}/> */}
                </>
            </TouchableWithoutFeedback>
            {/* </KeyboardAvoidingView> */}
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        // flex:1,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        backgroundColor: colors.BACKGROUND_COLOR
    },
    ScrollViewContainer: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR

    },
    inputText: {
        fontSize: 14,
        color: 'grey',
        borderWidth: 1,
        width: '85%',
        textAlign: 'left',
        borderColor: 'black',
        borderTopColor: 'transparent',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 15,
        width: 320,
        backgroundColor: 'transparent',
        marginTop: 5

    },
    loginButton: {
        marginTop: 30,
        width: 320,
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        // backgroundColor:'#A9A9A9',
        backgroundColor: 'black',
        marginBottom: 10
    },
    backButton: {
        marginTop: 10,
        width: 300,
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,

    },
    imageStyle: {
        width: 150,
        height: 150,
        margin: 10,
    },
    imageButton: {
        color: "white",
        margin: 10,
        textAlign: 'center',
        backgroundColor: 'black',
        padding: 7
    },
    textAreaContainer: {
        borderColor: "grey",
        borderWidth: 1,
        borderColor: '#d3d3d3',
        margin: 10,
        width: '85%',

    },
    textArea: {
        height: 100,
        padding: 10,
        backgroundColor: '#fafafa'
    },

})

export default Signup1