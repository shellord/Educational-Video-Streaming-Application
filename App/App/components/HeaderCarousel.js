import React, { useState } from 'react'
import { StyleSheet, Image,Dimensions} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'


const { width, height } = Dimensions.get('window')

const HeaderCarousel = () => {

    const DATA = [

        {
            id:1,
            imguri:'https://i.imgur.com/BhmNsjN.jpg'
        },
        {
            id:2,
            imguri:'https://i.imgur.com/BhmNsjN.jpg'
        }
    ]

    const renderItem = ({item}) =>(
      <Image 
        style={styles.imageStyle}
        source={{uri:item.imguri}}
      />  
    )
    return (
            <FlatList 
                style={styles.container}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            
    )
}

export default HeaderCarousel

const styles = StyleSheet.create({
    container:{
        marginVertical:10,
    },
    imageStyle:{
        width: width - 20,
        height: height / 4,
        marginHorizontal: 10,
    }
})
