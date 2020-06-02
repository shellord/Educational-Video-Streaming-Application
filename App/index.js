import React,{useState} from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer"
import Firebase from '../config/Firebase'
import { AuthContext } from "./context"
import Signup from './screens/Signup'
import Signin from './screens/Signin'
import Profile from './screens/Profile'
import Search2 from './screens/Search2'
import Search from "./screens/Search";
import SubjectMenu from './screens/SubjectMenu'
import Home from './screens/Home'
import Splash from './screens/Splash'
import {Icon} from 'react-native-elements'
import TopicList from "./screens/TopicList"
import ChapterVideo from "./screens/ChapterVideo"
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthStack = createStackNavigator()

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Signin"
      component={Signin}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="Signup"
      component={Signup}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
)

const Tabs = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SearchStack = createStackNavigator()

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} 
      options={{
        
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
        title: route.params.name
      })}    
      />
  </HomeStack.Navigator>
)

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
)

const ProfileStack = createStackNavigator()
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

      // You can return any component that you like here!
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
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => Logout()}
      />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator()
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
)

const RootStack = createStackNavigator()
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
)


export default () => {

  const [userToken, setUserToken] = useState(null)
  const [initializing, setInitializing] = useState(true)

  Firebase.auth().onAuthStateChanged((user) => {
    if(user){
      setUserToken(user)
    } else {
      setUserToken(null)
    }
    setInitializing(false)
})


  const handleSignUp = (email,password) => {     
    Firebase.auth()
        .createUserWithEmailAndPassword(email,password)
        .then(()=>setUserToken(Firebase.auth().currentUser))
        .catch(error => {
                alert(error.message)
        })            
  }

  const handleSignIn =(email,password) =>{
    Firebase.auth().signInWithEmailAndPassword(email,password)
            .then(() =>setUserToken(Firebase.auth().currentUser))
            .catch(error =>{
                alert(error.message)
            })
  }

  const authContext = React.useMemo(() => {
    return {
      signIn: (email,password) => {
        handleSignIn(email,password)
      },
      signUp: (email,password) => {
        handleSignUp(email,password)
      },
      signOut: () => {
        Firebase.auth().signOut()
      }
    }
  }, [])

  if(initializing){
    return(<Splash/>)
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
