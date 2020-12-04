import React,{useState} from 'react'
import {Text,View,FlatList,SafeAreaView,AsyncStorage,StyleSheet,Alert} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import VideoCardModel from '../components/VideoCardModel'
import {TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../styles/styles'

const WatchHistory = ({navigation}) => {
    const isFocused = useIsFocused()
    const [watchHistory, setwatchHistory] = useState()

    const clearHistory = () =>{
      Alert.alert(
        "Clear History",
        "Are you sure you want to clear watch history ?",
        [
          { text: "Yes", onPress: () => AsyncStorage.removeItem('watchHistory') },
          { text: "No", onPress: () => (null) }
        ],
        { cancelable: true }
      )
    }
    if(isFocused){
        AsyncStorage.getItem('watchHistory')
        .then(val => {
            setwatchHistory(JSON.parse(val))
        })          
    }
    return(
        <SafeAreaView style={styles.container}>
          <View style={{alignItems:'flex-end',margin:10}}>
          <TouchableOpacity onPress={()=>clearHistory()}>
            <Text style={{color:'tomato'}}>Clear History</Text></TouchableOpacity>
            </View>
            <FlatList
              data={watchHistory}
              renderItem={( {item} ) => 
              (
                <VideoCardModel
                  id={item.id}
                  url={item.url}
                  title = {item.title}
                  description = {item.description}
                  image={item.image}
                  subject={item.subject}
                  topic={item.topic}
                  navigation={navigation}
                  isfree={item.isfree}
                  class={item.class}
              />
    
              )
            }
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          />
          </SafeAreaView>
    )
 }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:colors.BACKGROUND_COLOR,
  }
})

export default WatchHistory


