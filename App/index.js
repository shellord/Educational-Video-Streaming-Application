import React,{useState} from "react"
import {AsyncStorage} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer"
import Firebase from '../config/Firebase'
import { AuthContext } from "./context"
import Signup from './screens/Signup'
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
import MobileAuth from './screens/MobileAuth'
import PostLogin from './screens/PostLogin'
import IntroScreen from './screens/IntroScreen'

const AuthStack = createStackNavigator()
const Tabs = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SearchStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const RootStack = createStackNavigator()
const API_URL='http://192.168.1.12:3000'

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Signin"
      component={MobileAuth}
      options={{ title: "Log in" }}
    />
    <AuthStack.Screen
      name="Signup"
      component={Signup}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
)

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Marvel Creative Learning App" component={Home} 
      options={{
        headerTitleStyle:{
          fontSize:16,
          color:'#3f51b5'
        },
        headerLeft: () => (
          <Icon name='menu'
            size={34}
            onPress={() => navigation.openDrawer()}

          />
        ),
      }}
    />
    <HomeStack.Screen
      name="subject"
      component={SubjectMenu}
      options={({ route }) => ({
        title: route.params.name
      })}
    />
     <HomeStack.Screen
      name="topiclist"
      component={TopicList}
      options={({ route }) => ({
        title: route.params.name
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

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
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
      } else if (route.name === 'Search') {
        iconName = focused ? 'ios-search' : 'ios-search';
      }
      else if (route.name === 'Account') {
        iconName = focused ? 'ios-person' : 'ios-person';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  }}
  >
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
    <Tabs.Screen name="Account" component={ProfileStackScreen} />
  </Tabs.Navigator>
)

const Logout = ()=>{
  Firebase.auth().signOut()
  return(null)
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerProfile />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => Logout()}
      />
    </DrawerContentScrollView>
  );
}
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
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
      if(Object.keys(json.response).length!=0){
        setisFinishedSignup(1)
      }
      setInitializing(false)
     })
    .catch((error) => {
      alert("error")
    })
  }

  Firebase.auth().onAuthStateChanged((user) => {
      if(user){
        checkReg(user)
        setUserToken(user)
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
      },
      API_URL:API_URL,
    }
  }, [])
  

  if(initializing){
    return(<Splash/>)
  }


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} isFinishedSignup={isFinishedSignup} showIntroScreen={showIntroScreen}/>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
