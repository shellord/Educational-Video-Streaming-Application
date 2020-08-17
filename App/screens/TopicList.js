import React,{useState,useEffect} from 'react'
import {StyleSheet,Text,FlatList,View} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import TopicCard from '../components/TopicCard'
import { AuthContext } from "../context"

const TopicList = ({route}) => {

    const {API_URL} = React.useContext(AuthContext)
    const [topics,setTopics] = useState([{}]);
    useEffect(() => {
        fetch(API_URL+`/api/topics/${route.params.name}`)
        .then((response) => response.json())
        .then((json) => {
              setTopics(json.response)
        })
        .catch((error) => {
          alert("Network Issue!.Check your internet connection")
        })

      }, [])
    return(
        <View>
            <FlatList
            data={topics}
            renderItem={({ item }) => (
                
                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                    <TopicCard
                        subject={route.params.name}
                        item={item}  
                        navigation={route.params.nav}         
                    />
                </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})


export default TopicList