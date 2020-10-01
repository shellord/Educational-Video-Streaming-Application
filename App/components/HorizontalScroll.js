import React from 'react'
import { View, Text,ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import Category from './Category'

const HorizontalScroll = ({subjects,navigation,userclass}) => {
    return (
      <View>
        <ScrollView
            scrollEventThrottle={16}
          >
              <View style={styles.subjectListHeader}>
                <Text style={styles.subjectListText}>
                  Subjects 
                </Text>
                <View style={styles.subjectListView}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {subjects.map((subject,key) => {   
                      return( 
                        <TouchableOpacity key={key} onPress={() => navigation.push('topiclist',{name:subject.name,nav:navigation,userclass:userclass})}>
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
      fontSize:22,
      fontWeight:'700',
      paddingLeft:20,
      // color:"white"
    },
    subjectListView:{
      height:130,
      marginTop:20
    }

})

export default HorizontalScroll
