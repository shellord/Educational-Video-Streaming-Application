import React,{useState,useEffect,useRef} from 'react'
import {View,StyleSheet,FlatList,TextInput} from 'react-native'
import { AuthContext } from "../context"
import VideoCardModel from '../components/VideoCardModel'
import  Firebase from '../../config/Firebase'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Constants from 'expo-constants'
import colors from '../styles/styles'

const Search = ({ navigation }) => {
  const {API_URL} = React.useContext(AuthContext)
  const [search, setsearch] = useState('')
  const [results, setResults] = useState('')
  const [userclass,setUserClass] = useState(1)
  const searchInput = useRef()

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
    <View style={styles.container}>
         <View style={styles.searchSection }>
        <Ionicons name='ios-search' size={14} color='#fff' />
        <TextInput 
          value={search}
          autoFocus={true}
          ref={searchInput}
          placeholder="Search Lessons"
          onChangeText={(text)=>setsearch(text)}
          placeholderTextColor={'white'}
          style={styles.searchBar}
        />
        </View>
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
              isfree={item.isfree}
              class={item.class}
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
    backgroundColor:colors.BACKGROUND_COLOR,
    paddingTop:Constants.statusBarHeight
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    width:"90%",
    alignSelf:'center',
    borderRadius:10,
    marginBottom:20,
    marginTop:20
},
searchIcon: {
    padding: 10,
},
searchBar: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'tomato',
    color: 'white',
},

})
export default Search