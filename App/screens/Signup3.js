import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AuthContext } from "../context"
import Autocomplete from 'react-native-autocomplete-input';
import Constants from 'expo-constants'
import colors from '../styles/styles'

const Signup3 = ({ navigation, route }) => {

    const { signUp, API_URL } = React.useContext(AuthContext)
    const [selectedSchoolValue, setSelectedSchoolValue] = useState([{}])
    const [schoolname, setschoolname] = useState('')
    const [filteredSchools, setFilteredSchools] = useState([])
    const [Schools, setSchools] = useState([])

    useEffect(() => {
        fetch(API_URL + '/api/schoollist')
            .then((res) => res.json())
            .then((json) => {
                // const { resonse: Schools } = json;
                setSchools(json.response)
                //setting the data in the Schools state
            })
            .catch((e) => {
                alert(e);
            })
    }, [])
    const findSchool = (query) => {
        // Method called every time when we change the value of the input
        if (query) {
            // Making a case insensitive regular expression
            const regex = new RegExp(`${query.trim()}`, 'i');
            // Setting the filtered School array according the query
            setFilteredSchools(
                Schools.filter((School) => School.title.search(regex) >= 0)
            )
        } else {
            // If the query is null then return blank
            setFilteredSchools([]);
        }
    }
    const onCompleteHandler = () => {
        let selectedValue = route.params.selectedValue
        let fname = route.params.fname
        let lname = route.params.lname
        let date = route.params.date
        let email = route.params.email
        let password = route.params.password
        let phone = route.params.phone
        let address = route.params.address
        let image = route.params.image
        let syllabus = route.params.syllabus
        let street = route.params.street
        let city = route.params.city
        let pincode = route.params.pincode
        let userschool
        console.log(11)
        if (schoolname.length > selectedSchoolValue.title.length) {
            userschool = schoolname
        }
        else {
            userschool = selectedSchoolValue.title
        }
        console.log(userschool)
        if (!userschool) {
            alert("You need to enter school name to Signup!")
            return
        }

        signUp(selectedValue, fname, lname, date, email, password, phone, address, image, userschool, street, city, pincode, syllabus)
    }
    return (
        <View style={styles.container}>
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
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 100 }}>
                <TouchableOpacity style={styles.loginButton} onPress={() => onCompleteHandler()}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup3

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: '',
        marginTop: Constants.statusBarHeight,
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
    }
})
