import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, View, SafeAreaView, ActivityIndicator, Text } from 'react-native'
import TopicCard from '../components/TopicCard'
import { AuthContext } from "../context"
import colors from '../styles/styles'

const TopicList = ({ route }) => {

    const { API_URL } = React.useContext(AuthContext)
    const [topics, setTopics] = useState([{}])
    useEffect(() => {
        fetch(API_URL + `/api/topics/${route.params.name}/${route.params.userclass}/${route.params.syllabus}`)
            .then((response) => response.json())
            .then((json) => {
                setTopics(json.response)
            })
            .catch((error) => {
                alert("Network Issue!.Check your internet connection")
            })

    }, [])
    //   if(topics){
    //      if(Object.keys(topics[0]).length==1){
    //         return(
    //             <ActivityIndicator 
    //             size="large"
    //             style={{flex:1,justifyContent:'center',alignItems:'center'}}
    //             />
    //         )
    //     }
    // }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={topics}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, flexDirection: 'row', margin: 1 }}>
                        <TopicCard
                            subject={route.params.name}
                            item={item}
                            navigation={route.params.nav}
                            userclass={route.params.userclass}
                            syllabus={route.params.syllabus}
                        />
                    </View>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR
    }
})


export default TopicList