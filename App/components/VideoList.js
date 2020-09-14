import React from 'react'
import { View, Text,StyleSheet,ScrollView} from 'react-native'
import HorizontalVideoCard from './HorizontalVideoCard'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const VideoList = ({data,navigation,title}) => {
    return (
        <View>
        <ScrollView
            scrollEventThrottle={16}
          >
              <View style={styles.subjectListHeader}>
                <Text style={styles.subjectListText}>
                  {title}
                </Text>
                <View style={styles.subjectListView}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {data.map((subject,key) => { 
                      return( 
                        <TouchableWithoutFeedback key={key} onPress={() => navigation.push('chaptervideo',{name:subject.title,description:subject.description,url:subject.url,nav:navigation,subject:subject.subject,topic:subject.topic,image:subject.image,isfree:subject.isfree,id:subject.id})}>
                          <HorizontalVideoCard 
                            key={key}
                            name={subject.title}
                            imageUri = {{uri:subject.image}}
                            navigation={navigation}
                            subject={subject.subject}
                            topic={subject.topic}
                          />
                          </TouchableWithoutFeedback>
                      )
                    })}
                  </ScrollView>
                </View>
              </View>

          </ScrollView>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    subjectListHeader:{
      // flex:1,
      paddingTop:10
    },
    subjectListText:{
      fontSize:20,
      fontWeight:'700',
      paddingHorizontal:20
    },
    subjectListView:{
      height:250,
      marginTop:20
    }

})


export default VideoList
