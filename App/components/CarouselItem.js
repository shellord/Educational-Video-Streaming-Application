import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import {TouchableWithoutFeedback } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

const CarouselItem = ({ item,nav }) => {
    return (
        <TouchableWithoutFeedback onPress={()=>nav.push('chaptervideo',{name:item.title,description:item.description,url:item.url,nav:nav,subject:item.subject,topic:item.topic,isfree:item.isfree,image:item.image,id:item.id,class:item.class})}>
            <View style={styles.cardView}>
                <Image style={styles.image} source={{ uri: item.image }} />
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

export default CarouselItem