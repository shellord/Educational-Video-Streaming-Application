import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import { AuthContext } from "../context"
import Firebase from "../../config/Firebase"
import UpcomingLiveCard from '../components/UpcomingLiveCard'
import colors from '../styles/styles'

const UpcomingLive = ({ route, navigation }) => {

    const { API_URL } = React.useContext(AuthContext)
    const [userclass, setUserClass] = useState('')
    const [syllabus, setsyllabus] = useState('')
    const [upcominglivevids, setupcominglivevids] = useState([{}])

    useEffect(() => {
        fetch(API_URL + `/api/users/email/${Firebase.auth().currentUser.email}`)
            .then((response) => response.json())
            .then((json) => {
                setUserClass(json.response[0]["class"])
                setsyllabus(json.response[0].syllabus)
                fetch(API_URL + `/api/upcominglive/${userclass}/${syllabus}`)
                    .then((response) => response.json())
                    .then((json) => {
                        setupcominglivevids(json.response)
                    })
                    .catch((error) => {
                    })
            })
            .catch((error) => {
                alert("Error!")
            })
    }, [userclass, syllabus, upcominglivevids])

    // if (upcominglivevids) {
    //     if (upcominglivevids[0].length == 1) {
    //         return (
    //             <ActivityIndicator
    //                 size="large"
    //                 style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    //             />
    //         )
    //     }
    // }
    return (
        <ScrollView style={styles.container}>
            {upcominglivevids ?
                <FlatList
                    data={upcominglivevids}
                    renderItem={({ item }) => (
                        <UpcomingLiveCard
                            id={item.id}
                            navigation={navigation}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            time={item.time}
                        />

                    )}
                    keyExtractor={(item, index) => index.toString()}
                /> : null
            }


        </ScrollView>
    )
}

export default UpcomingLive

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR

    }
})
