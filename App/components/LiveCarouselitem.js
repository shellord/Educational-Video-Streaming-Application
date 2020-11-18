import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import {TouchableWithoutFeedback } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

const LiveCarouselitem = ({ item,nav }) => {
    return (
        <TouchableWithoutFeedback onPress={()=>nav.push('LiveStreamingScreen',{nav:nav})}>
            <View style={styles.cardView}>
                <Image style={styles.image} source={{uri:'https://image.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg'}} />
                <View style={styles.textView}>
                    <Text style={styles.itemTitle}> {item.title}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cardView: {
        width: width - 20,
        height: height / 4,
        backgroundColor: 'white',
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