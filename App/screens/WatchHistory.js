import React,{useState} from 'react'
import {Text,View,FlatList,SafeAreaView,StyleSheet,Alert} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import VideoCardModel from '../components/VideoCardModel'
import {TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../styles/styles'

const WatchHistory = ({navigation}) => {
    const [watchHistory, setwatchHistory] = useState()


  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('watchHistory')
      setwatchHistory({})
    } catch (e) {
      console.log(e)
    }

    console.log('Done.')
  }
    const clearHistory = () =>{
      Alert.alert(
        "Clear History",
        "Are you sure you want to clear watch history ?",
        [
          { text: "Yes", onPress: () => removeValue() },
          { text: "No", onPress: () => (null) }
        ],
        { cancelable: true }
      )
    }
    
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('watchHistory')
      return jsonValue != null ? setwatchHistory(JSON.parse(jsonValue)) : null
    } catch (e) {
      // console.log(e)
    }
  }  
  if (useIsFocused()){
        // AsyncStorage.getItem('watchHistory')
        // .then(val => {
        //     setwatchHistory(JSON.parse(val))
        // })  
        getData()
    }
    return(
        <SafeAreaView style={styles.container}>
          <View style={{alignItems:'flex-end',margin:10}}>
          <TouchableOpacity onPress={()=>clearHistory()}>
            <Text style={{color:'tomato'}}>Clear History</Text></TouchableOpacity>
            </View>
        {WatchHistory ? <FlatList
          data={watchHistory}
          renderItem={({ item }) =>
          (
            <VideoCardModel
              id={item.id}
              url={item.url}
              title={item.title}
              description={item.description}
              image={item.image}
              subject={item.subject}
              topic={item.topic}
              navigation={navigation}
              isfree={item.isfree}
              class={item.class}
              type={2}
            />

          )
          }
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />:null}
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


