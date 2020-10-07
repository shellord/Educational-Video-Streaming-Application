import React,{useState} from "react"
import {AsyncStorage, StyleSheet} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer"
import Firebase from '../config/Firebase'
import { AuthContext } from "./context"
import Profile from './screens/Profile'
import Search from "./screens/Search";
import SubjectMenu from './screens/SubjectMenu'
import Home from './screens/Home'
import Splash from './screens/Splash'
import {Icon} from 'react-native-elements'
import TopicList from "./screens/TopicList"
import ChapterVideo from "./screens/ChapterVideo"
import Ionicons from 'react-native-vector-icons/Ionicons'
import DrawerProfile from './components/DrawerProfile'
import PostLogin from './screens/PostLogin'
import IntroScreen from './screens/IntroScreen'
import Announcements from './screens/Announcements'
import WatchHistory from './screens/WatchHistory'
import GettingStarted from './screens/GettingStarted'
import MobileLogin from './screens/MobileLogin'
import MobileVerification from './screens/MobileVerification'
import { HeaderBackButton } from "@react-navigation/stack"
import { StatusBar } from 'expo-status-bar';

import colors from './styles/styles'

const AuthStack = createStackNavigator()
const Tabs = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SearchStack = createStackNavigator()
const WatchHistoryStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const AnnouncementStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const RootStack = createStackNavigator()

const API_URL='http://18.223.24.160:3000'
const ASSETS_URL='http://18.223.24.160/marvelprofile/uploads/'

const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName={MobileLogin}
  >
    <AuthStack.Screen
      name="GettingStarted"
      component={GettingStarted}
      options={{ 
        title: "Getting Started",
        headerShown:false
       }}
    />
    <AuthStack.Screen
      name="MobileLogin"
      component={MobileLogin}
      options={{ 
        title: "MobileLogin",
        headerShown:false
    }}
    />
      <AuthStack.Screen
      name="MobileVerification"
      component={MobileVerification}
      options={{ title: "MobileVerification" }}
    />
  </AuthStack.Navigator>
)

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator   >
    <HomeStack.Screen name="Marvel Creative Learning App" component={Home} 
      options={{
        headerTitleStyle:{
          fontSize:14,
          color:colors.HEADER_TEXT_COLOR,
        },
        headerStyle:{
          backgroundColor:colors.BACKGROUND_COLOR,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0.2,
        },
        // headerLeft: () => (
        //   <Icon name='menu'
        //     size={34}
        //     onPress={() => navigation.openDrawer()}
        //     color={colors.HEADER_TEXT_COLOR}
        //   />
        // ),
      }}
    />
    <HomeStack.Screen
      name="subject"
      component={SubjectMenu}
      options={({ route }) => ({
        title: route.params.name,
        headerStyle:{
          backgroundColor:colors.BACKGROUND_COLOR
        },
        headerTitleStyle:{
          fontSize:16,
          color:colors.HEADER_TEXT_COLOR
        },
        headerTintColor:colors.HEADER_TEXT_COLOR
      })}
    />
     <HomeStack.Screen
      name="topiclist"
      component={TopicList}
      options={({ route }) => ({
        title: route.params.name,
        headerStyle:{
          backgroundColor:colors.BACKGROUND_COLOR
        },
        headerTitleStyle:{
          fontSize:16,
          color:colors.HEADER_TEXT_COLOR
        },
        headerTintColor:colors.HEADER_TEXT_COLOR
      })}    
      />
    <HomeStack.Screen
      name="chaptervideo"
      component={ChapterVideo}
      options={({ route }) => ({
        title: route.params.name,
        headerShown:false
      })}    
      />
  </HomeStack.Navigator>
)

const SearchStackScreen = () => (
  <SearchStack.Navigator
  headerMode='none'
  >
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen
      name="chaptervideo"
      component={ChapterVideo}
      options={({ route }) => ({
        title: route.params.name
      })}    
      />
  </SearchStack.Navigator>
)

const WatchHistoryStackScreen = ({navigation}) => (
  <WatchHistoryStack.Navigator>
    <WatchHistoryStack.Screen 
      name="Watch History" 
      component={WatchHistory} 
      
      options={{
        // headerShown:false
        headerStyle:{
          backgroundColor:colors.BACKGROUND_COLOR
        },
        headerTitleStyle:{
          fontSize:16,
          color:colors.HEADER_TEXT_COLOR
        },
        headerTintColor:colors.HEADER_TEXT_COLOR,
        headerLeft: () => (
          <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={colors.HEADER_TEXT_COLOR}/>
        )
      }}
    />
    <WatchHistoryStack.Screen
      name="chaptervideo"
      component={ChapterVideo}
      options={({ route }) => ({
        title: route.params.name,
        // headerShown:false
        headerStyle:{
          backgroundColor:colors.BACKGROUND_COLOR
        },
        headerTitleStyle:{
          fontSize:16,
          color:colors.HEADER_TEXT_COLOR
        },
        headerTintColor:colors.HEADER_TEXT_COLOR,
      })}    
      />
  </WatchHistoryStack.Navigator>
)

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen 
      name="Profile" 
      component={Profile} 
      options={{
        headerLeft: () => (
          <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={colors.HEADER_TEXT_COLOR}/>
        )
      }}
    />
  </ProfileStack.Navigator>
)


const AnnouncementStackScreen = () => (
  <AnnouncementStack.Navigator>
    <AnnouncementStack.Screen name="Notifications" component={Announcements} />
  </AnnouncementStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused
          ? 'ios-home'
          : 'ios-home';
        } 
      else if (route.name === 'Search') {
        iconName = focused ? 'md-search' : 'md-search';
     }
     else if (route.name === 'Notifications') {
      iconName = focused ? 'ios-notifications' : 'ios-notifications';
     }
    //  else if (route.name === 'History') {
    //   iconName = focused ? 'ios-time' : 'ios-time';
    //  }
      else if (route.name === 'Settings') {
        iconName = focused ? 'ios-settings' : 'ios-settings';
      }

      return <Ionicons name={iconName} size={size} color={colors.TAB_BAR_ICON_COLOR} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    style:{  
       backgroundColor:colors.TABBAR_COLOR,
    },
    labelStyle:{
      color:colors.TAB_BAR_TEXT_COLOR
    }
  }}
  
  >
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
    {/* <Tabs.Screen name="History" component={WatchHistoryStackScreen} /> */}
    <Tabs.Screen name="Notifications" component={AnnouncementStackScreen} />
    <Tabs.Screen name="Settings" component={ProfileStackScreen} />

  </Tabs.Navigator>
)

const Logout = ()=>{
  Firebase.auth().signOut()
  return(null)
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor:colors.BACKGROUND_COLOR}} >
      <DrawerProfile />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{color:colors.DRAWER_TEXT_COLOR}}
        onPress={() => Logout()}
        icon={() => <Ionicons name="ios-log-out" size={24} color={colors.DRAWER_ICON_COLOR}/>}
      />
    </DrawerContentScrollView>
  )
}
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home" 
    drawerContent={(props) => <CustomDrawerContent {...props} />} 
    drawerContentOptions={{
      labelStyle:{color:colors.DRAWER_TEXT_COLOR}
    }}   
  >
    <Drawer.Screen name="Home" component={TabsScreen} options={{
      drawerIcon: () => <Ionicons name="ios-home" size={24} color={colors.DRAWER_ICON_COLOR}/>
    }}
    />
    <Drawer.Screen name="History" component={WatchHistoryStackScreen} options={{
      drawerIcon: () => <Ionicons name="ios-time" size={24} color={colors.DRAWER_ICON_COLOR}/>,     
    }} />

    <Drawer.Screen name="Profile" component={ProfileStackScreen} options={{
      drawerIcon: () => <Ionicons name="ios-person" size={24} color={colors.DRAWER_ICON_COLOR}/> 

    }} 
    />
  </Drawer.Navigator>
)

const RootStackScreen = ({ userToken,isFinishedSignup,showIntroScreen }) => (
  <RootStack.Navigator headerMode="none">
    {

      showIntroScreen?(
        <RootStack.Screen
          name="IntroScreen"
          component={IntroScreen}
        />
        ):( userToken ?(isFinishedSignup?( 
        <RootStack.Screen
          name="App"
          component={DrawerScreen}
          options={{
            animationEnabled: false
          }}
        />):( 
        <RootStack.Screen
          name="PostLogin"
          component={PostLogin}
          options={{
            animationEnabled: false
          }}
        />)
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{
              animationEnabled: false
            }}
          />
        ))
       

    }
  </RootStack.Navigator>
)


export default () => {

  const [userToken, setUserToken] = useState(null)
  const [initializing, setInitializing] = useState(true)
  const [isFinishedSignup, setisFinishedSignup] = useState(0)
  const [showIntroScreen, setShowIntroScreen] = useState(1)
  
  AsyncStorage.getItem('showIntro')
  .then(val => {
    if (val !== null) setShowIntroScreen(0)
  })

  const checkReg = (user)=>{
     fetch(API_URL+`/api/users/${user.phoneNumber}`)
    .then((response) => response.json())
    .then((json) => {
      try{
        if(json.response[0].class){
          setisFinishedSignup(1)
        }
     }
     catch(e){
       
     }
      // if(Object.keys(json.response).length!=0){
      //   setisFinishedSignup(1)
      // }
      setInitializing(false)
      setUserToken(user)

     })
    .catch((error) => {
      alert(error)
    })
    
  }


  Firebase.auth().onAuthStateChanged((user) => {
      if(user){
        checkReg(user)

      } else {
        setUserToken(null)
        setInitializing(false)

      }
  })
  
   
 

  // const handleSignUp = (email,password) => {     
  //   Firebase.auth()
  //       .createUserWithEmailAndPassword(email,password)
  //       .then(()=>setUserToken(Firebase.auth().currentUser))
  //       .catch(error => {
  //               alert(error.message)
  //       })            
  // }

  // const handleSignIn =(email,password) =>{
  //   Firebase.auth().signInWithPhoneNumber('+918592800500')
  //           .then(() =>setUserToken(Firebase.auth().currentUser))
  //           .catch(error =>{
  //               alert(error.message)
  //           })
  // }

  const authContext = React.useMemo(() => {
    return {
      // signIn: (email,password) => {
      //   handleSignIn(email,password)
      // },
      // signUp: (email,password) => {
      //   handleSignUp(email,password)
      // },
      signOut: () => {
        Firebase.auth().signOut()
      },
      finishLogin:() =>{
        setisFinishedSignup(1)
      },
      IntroDone:() =>{
        setShowIntroScreen(0)
        AsyncStorage.setItem('showIntro','false')
      },
      API_URL:API_URL,
      ASSETS_URL:ASSETS_URL
      }
  }, [])
  

  if(initializing){
    return(<Splash/>)
  }


  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar style="light" />
      <NavigationContainer>
        <RootStackScreen userToken={userToken} isFinishedSignup={isFinishedSignup} showIntroScreen={showIntroScreen}/>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}