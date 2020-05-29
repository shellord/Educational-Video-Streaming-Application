import React from 'react'
import { View, Text,ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import Category from './Category'

const HorizontalScroll = ({subjects,navigation}) => {
    return (
      <View>
        <ScrollView
            scrollEventThrottle={16}
          >
              <View style={styles.subjectListHeader}>
                <Text style={styles.subjectListText}>
                  What would you like to learn ?
                </Text>
                <View style={styles.subjectListView}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {subjects.map((subject,key) => {   
                      return( 
                        <TouchableOpacity key={key} onPress={() => navigation.push('topiclist',{name:subject.name,nav:navigation})}>
                          <Category 
                          key={key}
                          name={subject.name}
                          imageUri = {{uri:subject.imguri}}
                          navigation={navigation}
                          />
                          </TouchableOpacity>
                      )
                    })}
                  </ScrollView>
                </View>
              </View>

          </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    subjectListHeader:{
      flex:1,
      paddingTop:10
    },
    subjectListText:{
      fontSize:20,
      fontWeight:'700',
      paddingHorizontal:20
    },
    subjectListView:{
      height:130,
      marginTop:20
    }

})

export default HorizontalScroll
