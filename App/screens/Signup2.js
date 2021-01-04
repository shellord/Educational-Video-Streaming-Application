import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Constants from 'expo-constants'
import colors from '../styles/styles'
import { AuthContext } from "../context"
import Autocomplete from 'react-native-autocomplete-input';


const Signup2 = ({ navigation, route }) => {

    const { signUp, API_URL } = React.useContext(AuthContext)
    const [school, setschool] = useState('')
    const [street, setstreet] = useState('')
    const [pincode, setpincode] = useState('')
    const [city, setcity] = useState('')
    const [address, setaddress] = useState('')
    const [Schools, setSchools] = useState([])
    // For Filtered Data
    const [filteredSchools, setFilteredSchools] = useState([])
    // For Selected Data
    const [selectedSchoolValue, setSelectedSchoolValue] = useState('')
    const [schoolname, setschoolname] = useState('')
    useEffect(() => {
        fetch(API_URL + '/api/schoollist')
            .then((res) => res.json())
            .then((json) => {
                // const { resonse: Schools } = json;
                setSchools(json.response)
                console.log(json.response)
                //setting the data in the Schools state
            })
            .catch((e) => {
                alert(e);
            });
    }, []);

    const findSchool = (query) => {
        // Method called every time when we change the value of the input
        if (query) {
            // Making a case insensitive regular expression
            const regex = new RegExp(`${query.trim()}`, 'i');
            // Setting the filtered School array according the query
            setFilteredSchools(
                Schools.filter((School) => School.title.search(regex) >= 0)
            );
        } else {
            // If the query is null then return blank
            setFilteredSchools([]);
        }
    };

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
        let userschool
        selectedSchoolValue ? userschool = selectedSchoolValue : userschool = schoolname
        if (!/^[a-zA-Z]+$/.test(school) || !/^[a-zA-Z]+$/.test(street) || !/^[a-zA-Z]+$/.test(city)) {
            alert("use only valid characters!")
            return
        }

        if (school.length < 4) {
            alert("Your school name is not complete!")
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
        if (!school || !street || !pincode || !city || !address || !address || !userschool) {
            alert("You need to enter all details to complete signing up")
            return
        }

        signUp(selectedValue, fname, lname, date, email, password, phone, address, image, userschool, street, city, pincode, syllabus)
    }

    return (
        // <ScrollView style={styles.ScrollViewContainer} contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >



            {/* <TextInput style={styles.inputText}
                onChangeText={text => setschool(text.replace(/['"]+/g, ''))}
                value={school}
                placeholder="School Name"
            /> */}

            {/* <View style={styles.descriptionContainer}>
                {Schools.length > 0 ? (
                    <>
                        <Text style={styles.infoText}>
                            Selected Data
              </Text>
                        <Text style={styles.infoText}>
                            {JSON.stringify(selectedSchoolValue)}
                        </Text>
                    </>
                ) : (
                        <Text style={styles.infoText}>
                            Enter The School Title
                        </Text>
                    )}
            </View> */}
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.autocompleteContainer}
                // Data to show in suggestion
                inputContainerStyle={styles.autocompleteInputText}
                data={filteredSchools}
                // Default value if you want to set something in input
                defaultValue={
                    JSON.stringify(selectedSchoolValue) === '{}' ?
                        '' :
                        selectedSchoolValue.title
                }
                // Onchange of the text changing the state of the query
                // Which will trigger the findSchool method
                // To show the suggestions
                onChangeText={(text) => {
                    setschoolname(text)
                    findSchool(text)
                }}
                placeholder="Enter the School title"
                renderItem={({ item }) => (
                    // For the suggestion view
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedSchoolValue(item);
                            setFilteredSchools([]);
                        }}>
                        <Text style={styles.itemText}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <TextInput style={styles.inputText}
                onChangeText={text => setaddress(text.replace(/['"]+/g, ''))}
                value={address}
                placeholder="Address"
            />
            <TextInput style={styles.inputText}
                onChangeText={text => setstreet(text.replace(/['"]+/g, ''))}
                value={street}
                placeholder="Street Name"
            />
            <TextInput style={styles.inputText}
                onChangeText={text => setcity(text.replace(/['"]+/g, ''))}
                value={city}
                placeholder="City"
            />
            <TextInput style={styles.inputText}
                onChangeText={text => setpincode(text.replace(/['"]+/g, ''))}
                value={pincode}
                placeholder="Pincode"
                keyboardType={"number-pad"}
            />

            <TouchableOpacity style={styles.loginButton} onPress={() => onCompleteHandler()}>
                <Text style={styles.buttonText}>Sign Up</Text>
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
