import React,{useState} from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import {TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { AuthContext } from "../context"

const { width, height } = Dimensions.get('window')

const LiveCarouselitem = ({ item,nav }) => {
    const { ADMIN_UPLOADS_URL } = React.useContext(AuthContext)
    let image=''
    item.image ? image = ADMIN_UPLOADS_URL+ JSON.parse(item.image)[0].name:null
    return (
        <TouchableWithoutFeedback onPress={()=>nav.navigate('LiveStreamingScreen',{nav:nav,url:item.url})}>
                <View style={styles.cardView}>
                    <Image style={styles.image} source={{ uri: image }} />
                    <View style={styles.textView}>
                        <Text style={styles.itemTitle}> {item.name}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                </View>      
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    cardView: {
        width: width/1.5 ,
        height: height /4,
        backgroundColor: 'black',
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: width - 20,
        height: height / 3,
        borderRadius: 0
    },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default LiveCarouselitem