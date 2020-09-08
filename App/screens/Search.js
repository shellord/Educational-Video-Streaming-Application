import React,{useState,useEffect} from 'react'
import {View,StyleSheet,FlatList} from 'react-native'
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants'
import { AuthContext } from "../context"
import VideoCardModel from '../components/VideoCardModel'
import  Firebase from '../../config/Firebase'

const Search = ({ navigation }) => {

  const {API_URL} = React.useContext(AuthContext)
  const [search, setsearch] = useState('')
  const [results, setResults] = useState('')
  const [userclass,setUserClass] = useState(1)

  useEffect(() => {
    fetch(API_URL+`/api/users/${Firebase.auth().currentUser.phoneNumber}`)
    .then((response) => response.json())
    .then((json) => {
         setUserClass(json.response[0]['class'])
    })
    .catch((error) => {
    alert("Error!")
    })

  }, [])
  useEffect(() => {
    if(search){
      fetch(API_URL+'/api/search/'+search+'/'+userclass)
        .then((response) => response.json())
        .then((json) => {
              setResults(json.response)
        })
        .catch((error) => {
        })
    }
    
  }, [search])

  return(
    // <View
    //   <Text>Search Screen</Text>
    //   <Button title="Search 2" onPress={() => navigation.push("Search2")} />
    //   <Button
    //     title="React Native School"
    //     onPress={() => {
    //       navigation.navigate("Home", {
    //         screen: "Details",
    //         params: { name: "React Native School" }
    //       })
    //     }}
    //   />
    // </View>

    <View style={styles.container}>
      <SearchBar 
      value={search}
      placeholder="search lessons"
      onChangeText={(text)=>setsearch(text)}
      lightTheme
      />
       <FlatList
          data={results}
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
          />

          )
        }
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:Constants.statusBarHeight,
  }
})

  export default Search