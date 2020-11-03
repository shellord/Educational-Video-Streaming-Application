import React from 'react'
import { StyleSheet, Text, View,Image, Keyboard} from 'react-native'
import { TextInput, TouchableOpacity, TouchableFeedback, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants'
import TextBox from '../components/TextBox';

const ProfileScreen = ({navigation,userimage,route}) => {
    // const { userimage, username } = route.params;
    const { username } = route.params;

    return (
        
        <ScrollView  style={styles.container}>
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
                    <Text style={styles.avatarText}>Change Profile Photo</Text>
            </View>
            
            <View style={styles.detailsContainer}>
            <View>
                <Text style={styles.leftText}>
                    Name
                </Text>
                <Text style={styles.leftText}>
                    Email
                </Text>
                <Text style={styles.leftText}>
                    Phone Number
                </Text>
                <Text style={styles.leftText}>
                Address
                </Text>
            </View>
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreenEdit',{editvalue:username})}>
                <Text style={styles.rightText} >{username}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreenEdit',{editvalue:"someone@example.com"})}>
                <Text style={styles.rightText} >someone@example.com</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreenEdit',{editvalue:"9876543210"})}>
                <Text style={styles.rightText} >9876543210</Text>
                </TouchableOpacity>
                <View style={{width:200}}>
                <Text style={styles.rightText} numberOfLines={5}>White house, near the black house, behind the pink house and opp to alien store</Text>
                </View>
            </View>
            </View>
            {/* </TouchableWithoutFeedback> */}
        </ScrollView>
        
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop:Constants.statusBarHeight,
        backgroundColor:'white',
    },
	avatarContainer: {
		// flex: 1,
		alignItems: "center",
		// padding: 10,
		justifyContent: 'center',
	},
	avatar: {
		// flex: 1,
		justifyContent: "flex-end",
		height: 100,
		width: 100,
		borderRadius: 75,
    },
    avatarText:{
        color:'#1E88E5',
        fontSize:15,
        marginTop:4,
        fontWeight:"500"
    },
    detailsContainer:{  
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between',
        padding:20
    },
    leftText:{
        fontSize:18,
        marginTop:30
    },
    rightText:{
        fontSize:18,
        marginTop:30,
    }
})
