import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Keyboard } from 'react-native'
import { TextInput, TouchableOpacity, TouchableFeedback, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants'
import TextBox from '../components/TextBox';
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import { AuthContext } from "../context"
import Firebase from '../../config/Firebase'
import { useIsFocused } from '@react-navigation/native'


const ProfileScreen = ({ navigation, route }) => {

    const { API_URL, ASSETS_URL } = React.useContext(AuthContext)
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [syllabus, setsyllabus] = useState("")
    const [userclass, setuserclass] = useState('')
    const [pincode, setpincode] = useState('')
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [school, setSchool] = useState("")
    const [dob, setDob] = useState("")
    const [address, setaddress] = useState("")
    const [phone, setphone] = useState("")
    const [userimage, setuserimage] = useState(null)
    const [subscibtionstatus, setsubscibtionstatus] = useState(null)
    const [isimageuploading, setisimageuploading] = useState(0)

    const askForPermission = async () => {
        const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
        if (permissionResult.status !== "granted") {
            Alert.alert("no permissions to access camera!", [{ text: "ok" }])
            return false
        }
        return true
    }

    useEffect(() => {
        fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
            .then((response) => response.json())
            .then((json) => {
                setaddress(json.response[0].address)
                setfirstname(json.response[0].firstname)
                setlastname(json.response[0].lastname)
                setDob(json.response[0].dob)
                setuserclass(json.response[0].class)
                setCity(json.response[0].city)
                setStreet(json.response[0].street)
                setSchool(json.response[0].school)
                setpincode(json.response[0].pincode)
                setuserimage(ASSETS_URL + json.response[0].profile_pic)
                setsubscibtionstatus(json.response[0].subscription_status)
                setphone(json.response[0].phone)
            })
            .catch((error) => {
                alert(error)
            })
    }, [])

    if (useIsFocused()) {
        fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
            .then((response) => response.json())
            .then((json) => {
                setaddress(json.response[0].address)
                setfirstname(json.response[0].firstname)
                setlastname(json.response[0].lastname)
                setDob(json.response[0].dob)
                setCity(json.response[0].city)
                setuserclass(json.response[0].class)
                setStreet(json.response[0].street)
                setSchool(json.response[0].school)
                setpincode(json.response[0].pincode)
                // setuserimage(ASSETS_URL + json.response[0].profile_pic)
                setsubscibtionstatus(json.response[0].subscription_status)
                setphone(json.response[0].phone)
            })
            .catch((error) => {
                alert(error)
            })
    }

    const uploadImage = (email, image) => {
        let uri = image.uri
        let fileExtension = uri.substr(uri.lastIndexOf(".") + 1)
        fetch(`${API_URL}/api/uploadImage/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                imgsource: image.base64,
                imgname:
                    Math.random().toString(36).substring(2, 15) +
                    Math.random().toString(36).substring(2, 15) +
                    "." +
                    fileExtension,
            }),
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch((err) => console.log(err))
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
                setuserimage(image.uri)
                uploadImage(Firebase.auth().currentUser.email, image)
            }
        }
    }
    return (

        <ScrollView style={styles.container}>

            {/* <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}> */}
            <View style={styles.avatarContainer}>
                {userimage ? (
                    <Image source={{ uri: userimage }} style={styles.avatar} />
                ) : (
                        <Image
                            source={require("../../assets/userdefault.png")}
                            style={styles.avatar}
                        />
                    )}
                <TouchableOpacity onPress={takeImage}>
                    <Text style={styles.avatarText}>Change Profile Photo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.leftText}>
                        First Name
                </Text>
                    <Text style={styles.leftText}>
                        Last Name
                </Text>
                    <Text style={styles.leftText}>
                        Class
                </Text>
                    <Text style={styles.leftText}>
                        Email
                </Text>
                    <Text style={styles.leftText}>
                        Password
                </Text>
                    <Text style={styles.leftText}>
                        Phone
                </Text>
                    <Text style={styles.leftText}>
                        Address
                </Text>
                    <Text style={styles.leftText}>
                        Street
                </Text>
                    <Text style={styles.leftText}>
                        City
                </Text>
                    <Text style={styles.leftText}>
                        Pincode
                </Text>
                    <Text style={styles.leftText}>
                        School
                </Text>
                    <Text style={styles.leftText}>
                        Date of Birth
                </Text>

                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: firstname, dataToEdit: 'firstname' })}>
                        <Text style={styles.rightText} >{firstname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: lastname, dataToEdit: 'lastname' })}>
                        <Text style={styles.rightText} >{lastname}</Text>
                    </TouchableOpacity>
                    <Text style={styles.rightText} >{userclass}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: Firebase.auth().currentUser.email, dataToEdit: 'email' })}>
                        <Text style={styles.rightText} numberOfLines={1}>{Firebase.auth().currentUser.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: '', dataToEdit: 'password' })}>
                        <Text style={styles.rightText} >*********</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: phone, dataToEdit: 'phone' })} disabled={true}>
                        <Text style={styles.rightText} >{phone}</Text>
                    </TouchableOpacity>
                    <View style={{ width: 200 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: address, dataToEdit: 'address' })} disabled={true}>
                            <Text style={styles.rightText} numberOfLines={5}>{address}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: street, dataToEdit: 'street' })} disabled={true}>
                            <Text style={styles.rightText}> {street} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: city, dataToEdit: 'city' })} disabled={true}>
                            <Text style={styles.rightText}> {city} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: pincode, dataToEdit: 'pincode' })} disabled={true}>
                            <Text style={styles.rightText}> {pincode} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: school, dataToEdit: 'school' })} disabled={true}>
                            <Text style={styles.rightText}> {school} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreenEdit', { editvalue: dob, dataToEdit: 'dob' })} disabled={true}>
                            <Text style={styles.rightText}> {dob} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* </TouchableWithoutFeedback> */}
        </ScrollView>

    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
    },
    avatarContainer: {
        // flex: 1,
        alignItems: "center",
        // padding: 10,
        justifyContent: 'center',
        marginBottom: 20
    },
    avatar: {
        // flex: 1,
        justifyContent: "flex-end",
        height: 100,
        width: 100,
        borderRadius: 75,
    },
    avatarText: {
        color: '#1E88E5',
        fontSize: 15,
        marginTop: 4,
        fontWeight: "500"
    },
    detailsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 20,
    },
    leftText: {
        fontSize: 16,
        marginBottom: 30,
    },
    rightText: {
        fontSize: 16,
        marginBottom: 30,
        marginLeft: 10
    }
})
