import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Animated, Platform, Dimensions, Image } from 'react-native'
import LiveCarouselitem from './LiveCarouselitem'
import colors from '../styles/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Pressable } from 'react-native'



const { width, heigth } = Dimensions.get('window')
let flatList

function infiniteScroll(dataList) {
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    // setInterval(function() {
    //     scrolled ++
    //     if(scrolled < numberOfData)
    //     scrollValue = scrollValue + width

    //     else{
    //         scrollValue = 0
    //         scrolled = 0
    //     }

    //     this.flatList.scrollToOffset({ animated: true, offset: scrollValue})

    // }, 10000)
}


const LiveCarousel = ({ data, nav, title }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)

    useEffect(() => {
        setDataList(data)
        infiniteScroll(dataList)

    })


    if (data && data.length) {
        return (
            <View>

                <View style={styles.subjectListHeader}>
                    <Text style={styles.subjectListText}>
                        {title}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', flex: 1, margin: 10 }}>
                    <TouchableOpacity onPress={() => nav.push('UpcomingLive')} style={{ flex: 1, width: width / 4, height: '100%', backgroundColor: 'black', borderRadius: 10 }}>
                        <Image source={require('../../assets/live.png')} style={{ resizeMode: 'stretch', width: width / 4, height: '100%', borderRadius: 10 }} />
                    </TouchableOpacity>
                    <FlatList data={data}
                        // ref = {(flatList) => {this.flatList = flatList}}
                        keyExtractor={(item, index) => 'key' + index}
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={"fast"}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <LiveCarouselitem item={item} nav={nav} />
                            )
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                        )}
                    />

                    {/* <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                            />
                        )
                    })}

                </View> */}
                </View>
            </View>
        )
    }

    // console.log('Please provide Images')
    return null
}

const styles = StyleSheet.create({
    dotView: { flexDirection: 'row', justifyContent: 'center' },
    subjectListHeader: {
        flex: 1,
        paddingTop: 10,
        flexDirection: 'row',
        marginVertical: 10
    },
    subjectListText: {
        fontSize: Platform.OS == 'ios' ? 22 : 16,
        fontWeight: '700',
        paddingHorizontal: 20,
        color: colors.HEADER_TEXT_COLOR
    },
})

export default LiveCarousel
