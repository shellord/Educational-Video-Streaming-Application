import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { AuthContext } from "../context"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';



function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join('')// return adjusted time or original string
}

const UpcomingLiveCard = (item) => {

    async function checkMultiPermissions() {
        const { status, expires, permissions } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        )
        if (status !== 'granted') {
            alert('Hey! You have not enabled selected permissions');
        }
    }
    useEffect(() => {
        checkMultiPermissions()
    }, [])


    const { ADMIN_UPLOADS_URL } = React.useContext(AuthContext)
    let date, time, image, readabletime, timestamp
    item.image ? image = ADMIN_UPLOADS_URL + JSON.parse(item.image)[0].name.replace('/var/www/html/admin/', '') : null
    item.time ? date = item.time.split('T')[0] : null
    item.time ? time = item.time.split('T')[1].split('.')[0] : null
    item.time ? readabletime = tConvert(time).split(':')[0] + ':' + tConvert(time).split(':')[1] + ' ' + tConvert(time).split(':')[2][2] + tConvert(time).split(':')[2][3] : null
    item.time ? timestamp = Date.parse(item.time.split('Z'))[0] : null
    // function secondsDiff(d1, d2) {
    //     // console.log("d1:"+d1+"d2:"+d2)
    //     let secDiff = Math.floor((new Date(d2).getTime() - new Date(d1).getTime()) / 1000)

    //     return Math.abs(secDiff)
    // }
    function secondsDiff(d1, d2) {
        // console.log("d1:"+d1+"d2:"+d2)
        let secDiff = Math.floor((new Date(d1).getTime() - new Date(d2).getTime()) / 1000)
        // console.log("time d1" + d1)
        // console.log("time d2" + d2)
        // let td1 = new Date(d1).getTime()
        // let td2 = new Date(d2).getTime()
        // let diff = Math.floor((td1 - td2) / 1000)
        // console.log("d1: " + td1)
        // console.log("d2: " + td2)
        // console.log("diff: " + diff)
        // console.log(secDiff)
        return Math.abs(Math.ceil(secDiff))
    }
    secondsDiff(new Date(), new Date('2020-12-29T00:46:02.000Z'))
    // console.log(item.time)
    const subbedLive = {
        id: item.id,
        title: item.title,
        description: item.description,
    }
    let subHistory = subbedLive
    const doNotify = () => {
        // console.log(item)
        // Prepare the notification channel
        alert("Notification Turned on for this live video!")
        // Prepare the notification channel
        // Notifications.setNotificationChannelAsync('new-emails', {
        //     name: 'E-mail notifications',
        //     importance: Notifications.AndroidImportance.HIGH,
        //     sound: 'email-sound.wav', // <- for Android 8.0+, see channelId property below
        // });

        // Eg. schedule the notification
        Notifications.scheduleNotificationAsync({
            content: {
                title: item.title + " is now live",
                body: 'Watch it on Marvel Creative Learning App.',
                sound: 'email-sound.wav', // <- for Android below 8.0
            },
            trigger: {

                seconds: item.time * 3600,
                // channelId: 'new-emails', // <- for Android 8.0+, see definition above
            },
        });
    }
    const onNotifyHandler = () => {
        AsyncStorage.getItem('sublivehistory')
            .then(val => {
                if (val !== null) {
                    let valJson = JSON.parse(val)
                    if (!valJson.find(elem => elem.id === item.id)) {
                        subHistory = [...valJson, subbedLive]
                        AsyncStorage.setItem('sublivehistory', JSON.stringify(subHistory))
                            .then(() => {
                                doNotify()

                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                    else {
                        alert("Already enabled Notification!")
                    }
                }
                else {
                    AsyncStorage.setItem('sublivehistory', JSON.stringify([subHistory]))
                        .then(() => {
                            doNotify()
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })

    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.rightcontainer}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>{item.title}</Text>
                <Text>{date}</Text>
                <Text>{readabletime}</Text>
                <View style={styles.buttoncontainer}>
                    <Pressable onPress={() => onNotifyHandler()}>
                        <Text style={{ color: "blue", fontSize: 14 }}>Notify</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    )
}

export default UpcomingLiveCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        height: 150
    },
    rightcontainer: {
        flex: 1,
        alignItems: 'center',

    },
    buttoncontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 30
    }
})
