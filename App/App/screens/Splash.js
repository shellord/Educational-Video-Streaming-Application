import React from 'react'
import {ImageBackground,ActivityIndicator,StyleSheet} from 'react-native'
import bg from '../../assets/loading.gif'

const Splash = () => (
   <ImageBackground source={bg} style={{width: '100%', height: '100%'}}>
    {/* <ActivityIndicator style={styles.loading} size="large" color="green" /> */}
   </ImageBackground>  
  )

  const styles = StyleSheet.create({

    loading:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
  
  })
  
export default Splash