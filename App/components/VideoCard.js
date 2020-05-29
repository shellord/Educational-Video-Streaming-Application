import React from 'react'
import {StyleSheet} from 'react-native'
import { Text,Card} from 'react-native-elements'
import {TouchableOpacity } from 'react-native-gesture-handler'

const VideoCard = (props) =>{
    console.log(props)
    return(
        <TouchableOpacity onPress={()=>props.navigation.push('chaptervideo',{name:props.title,description:props.description,url:props.url})}>
            <Card
                title={props.title}
                image={{uri:'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/02/Google-Image-Search-796x417.jpg'}}
                >
            <Text style={{}}>
                {props.description}
            </Text>
            </Card>
         </TouchableOpacity>
                    
    )
}

const styles = StyleSheet.create({
    container:{

    }

})
export default VideoCard