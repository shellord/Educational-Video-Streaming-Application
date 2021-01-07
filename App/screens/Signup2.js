import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Constants from 'expo-constants'
import colors from '../styles/styles'
import { AuthContext } from "../context"
import Autocomplete from 'react-native-autocomplete-input';


const Signup2 = ({ navigation, route }) => {

    const [street, setstreet] = useState('')
    const [pincode, setpincode] = useState('')
    const [city, setcity] = useState('')
    const [address, setaddress] = useState('')


    const onCompleteHandler = () => {
        let selectedValue = route.params.selectedValue
        let fname = route.params.fname
        let lname = route.params.lname
        let date = route.params.date
        let email = route.params.email
        let password = route.params.password
        let phone = route.params.phone
        let image = route.params.image
        let syllabus = route.params.syllabus

        if (!/^[a-zA-Z]+$/.test(street) || !/^[a-zA-Z]+$/.test(city)) {
            alert("use only valid characters!")
            return
        }


        if (street.length < 5) {
            alert("Your street name is not complete!")
            return
        }
        if (city.length < 5) {
            alert("Your city name is not complete!")
            return
        }
        if (pincode.length != 6) {
            alert("Your Pincode is not complete!")
            return
        }
        if (!street || !pincode || !city || !address || !address) {
            alert("You need to enter all details to complete signing up")
            return
        }
        navigation.push("Signup3", { selectedValue: selectedValue, fname: fname, lname: lname, date: date, email: email, password: password, phone: phone, address: address, image: image, street: street, city: city, pincode, pincode, syllabus })

        // signUp(selectedValue, fname, lname, date, email, password, phone, address, image, userschool, street, city, pincode, syllabus)
    }

    return (
        // <ScrollView style={styles.ScrollViewContainer} contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <TextInput style={styles.inputText}
                    onChangeText={text => setaddress(text.replace(/['"]+/g, ''))}
                    value={address}
                    placeholder="Address"
                />
                <Text style={styles.requiredStyle}>*</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <TextInput style={styles.inputText}
                    onChangeText={text => setstreet(text.replace(/['"]+/g, ''))}
                    value={street}
                    placeholder="Street Name"
                />
                <Text style={styles.requiredStyle}>*</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <TextInput style={styles.inputText}
                    onChangeText={text => setcity(text.replace(/['"]+/g, ''))}
                    value={city}
                    placeholder="City"
                />
                <Text style={styles.requiredStyle}>*</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <TextInput style={styles.inputText}
                    onChangeText={text => setpincode(text.replace(/['"]+/g, ''))}
                    value={pincode}
                    placeholder="Pincode"
                    keyboardType={"number-pad"}
                />
                <Text style={styles.requiredStyle}>*</Text>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => onCompleteHandler()}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            {/* </ScrollView> */}
        </KeyboardAvoidingView>
    )

}

export default Signup2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.BACKGROUND_COLOR
    },
    requiredStyle: {
        fontSize: 16,
        marginTop: 20
    },
    ScrollViewContainer: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR
    },
    autocompleteContainer: {
        marginTop: 10,
        maxHeight: "20%"
    },
    autocompleteInputText: {

        borderWidth: 1,
        borderColor: 'black',
        borderTopColor: 'transparent',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 15,
        width: 320,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
    },
    textAreaContainer: {
        borderColor: "grey",
        borderWidth: 1,
        margin: 10,
        width: '85%',
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
        // marginTop:30,
        width: 320,
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        // backgroundColor:'#A9A9A9',
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


})
