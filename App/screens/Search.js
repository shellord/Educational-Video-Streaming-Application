import React from 'react'
import {Text,Button,useContext,View} from 'react-native'

const Search = ({ navigation }) => (
    <View>
      <Text>Search Screen</Text>
      <Button title="Search 2" onPress={() => navigation.push("Search2")} />
      <Button
        title="React Native School"
        onPress={() => {
          navigation.navigate("Home", {
            screen: "Details",
            params: { name: "React Native School" }
          })
        }}
      />
    </View>
  )
  export default Search