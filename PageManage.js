import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './Settings';
import RightsScreen from './Rights';
import CommunityScreen from './Community';
import Message from './Message';
import Home from './Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import SQLite from 'react-native-sqlite-storage';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from '@react-native-community/geolocation';
import Pulled_Over from './Pulled_Over';
import Stopped_Police from './Stopped_Police';
import Arrest from './Arrest';
import Door from './Door';
import Violated from './Violated';
import Misconduct from './Misconduct';
var db = SQLite.openDatabase(
  {
    name: 'stopped.db',
  });

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} 
        options={{
         title: 'Home',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
      
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName='Settings'>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} 
       options={{
         title: 'Settings',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
        <SettingsStack.Screen name="Message" component={Message} 
       options={{
         title: 'Messages',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
      
    </SettingsStack.Navigator>
  );
}

const RightsStack = createStackNavigator();

function RightsStackScreen() {
  return (
    <RightsStack.Navigator>
      <RightsStack.Screen name="Rights" component={RightsScreen} 
       options={{
         title: 'Know Your Rights',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
      <RightsStack.Screen name="PulledOver" component={Pulled_Over} 
       options={{
         title: 'Know Your Rights',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
       <RightsStack.Screen name="Stopped" component={Stopped_Police} 
       options={{
         title: 'Know Your Rights',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
       <RightsStack.Screen name="Arrest" component={Arrest} 
       options={{
         title: 'Know Your Rights',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
       <RightsStack.Screen name="Door" component={Door} 
       options={{
         title: 'Know Your Rights',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
       <RightsStack.Screen name="Violated" component={Violated} 
       options={{
         title: 'Know Your Rights',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
       <RightsStack.Screen name="Misconduct" component={Misconduct} 
       options={{
         title: 'Know Your Rights',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
    </RightsStack.Navigator>
  );
}

const CommunityStack = createStackNavigator();

function CommunityStackScreen() {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen name="Settings" component={CommunityScreen} 
       options={{
         title: 'Community',
         headerTitleAlign:'center',
         headerStyle:{
           backgroundColor: '#5c946e',
           
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold',
           fontFamily:'Roboto',
           
           
         }
       }} 
      />
      
    </CommunityStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();


export default class PageManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

componentDidMount(){
  SplashScreen.hide();
  db.transaction( function (txn) {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS ami_sms_contacts(
        id INTEGER PRIMARY KEY AUTOINCREMENT ,
        name  VARCHAR(100),
        number VARCHAR(20) UNIQUE)`,[]
    );
  });
 
 db.transaction( function (txn) {
   txn.executeSql(
     `CREATE TABLE IF NOT EXISTS ami_call_contacts(
       id INTEGER PRIMARY KEY AUTOINCREMENT ,
       name  VARCHAR(100) ,
       number VARCHAR(20) UNIQUE)`,[]
   );
 });
 db.transaction( function (txn) {
  txn.executeSql(
    `CREATE TABLE IF NOT EXISTS ami_messages(
      id INTEGER PRIMARY KEY AUTOINCREMENT ,
      message  VARCHAR(4000))`,[]
  );
});
db.transaction( function (txn) {
  txn.executeSql(
    `CREATE TABLE IF NOT EXISTS ami_geolocation(
      id INTEGER PRIMARY KEY AUTOINCREMENT ,
      longitude  VARCHAR(2000),
      latitude   VARCHAR(2000))`,[]
  );
});

db.transaction(function (tx) {
            
  tx.executeSql(
    "SELECT id FROM ami_messages",
    [],
    function (tx, res) {
      //console.log('item:', res.rows.length);
      if (res.rows.length == 0) {
        tx.executeSql(
          'INSERT INTO ami_messages (message) VALUES (?)',
          [ 'Alert! I have been pulled over.'],
          (tx, results) => {
            //console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              
              console.log('message inserted');
              
            }
          }
        );
      }
     
    })
},[]);


var that =this;
if(Platform.OS === 'ios'){
  this.callLocation(that);
}else{
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([

        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        

        
      ]);
      console.log(PermissionsAndroid.RESULTS.GRANTED);
      return that.callLocation(that);
    } catch (err) {
      
      console.warn(err)
    }
  }
  requestLocationPermission();
}    

}

componentWillUnmount = () => {
  Geolocation.clearWatch(this.watchID);
}
callLocation(that){
  //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
       (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
       },
       (error) => console.log(error.message),
       { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
       that.setState({ currentLongitude:currentLongitude });
       //Setting state Longitude to re re-render the Longitude Text
       that.setState({ currentLatitude:currentLatitude });
       //Setting state Latitude to re re-render the Longitude Text

       

      db.transaction(function (tx) {
            
        tx.executeSql(
          "SELECT id FROM ami_geolocation",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              tx.executeSql(
                'INSERT INTO ami_geolocation (longitude,latitude) VALUES (?,?)',
                [currentLongitude,currentLatitude],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    
                   /* Alert.alert(
                      'Success',
                      'GeoLocation Inserted'
                      
                    );*/
                    
                  } 
                }
              );
            }
            
            else{
              
              db.transaction((tx) => {
                tx.executeSql(
                  'SELECT * FROM ami_geolocation',[],
                  (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                      tx.executeSql(
             
                        'UPDATE ami_geolocation set longitude=? ,latitude=? where id=?',
                        [currentLongitude,currentLatitude,results.rows.item(0).id],
                        (tx, results) => {
                          console.log('Results', results.rowsAffected);
                          if (results.rowsAffected > 0) {
                           /* Alert.alert(
                              'Success Update',
                              'Geolocation update Successfully'
                              
                            );*/
                          //  that.simple();
                          } 
                        }
                      );
                    
                    }
                  }
                );
              });

           
            }
          })
      },[]);

    });
}


  render() {
    return (
    
      <Tab.Navigator
      initialRouteName="Settings"
      tabBarOptions={{
        activeBackgroundColor:'#fff',
        activeTintColor:'#5c946e',
        inactiveBackgroundColor:'#5c946e',
        inactiveTintColor:'#fff',
        labelStyle:{
          fontSize:10,
          marginBottom:10
        },
        
        style:{
          
          height:65,
          
          
        }
      }}
      >
        <Tab.Screen name="Home" 
        component={HomeStackScreen}
        options={{
          
          tabBarLabel:'Home',
          tabBarIcon:({color,size })=>(
            <Icon name="home" color={color} size={25}/>
          )
        }}
        
         />
        <Tab.Screen name="Settings"
         component={SettingsStackScreen} 
         options={{
          tabBarLabel:'Settings',
          tabBarIcon:({color,size })=>(
            <Icon name="cog" color={color} size={25}/>
          )
        }}
         />
        <Tab.Screen name="Rights" 
        component={RightsStackScreen}
        options={{
          tabBarLabel:'Your Rights',
          tabBarIcon:({color,size })=>(
            <Icon name="file-o" color={color} size={25}/>
          )
        }}
         />
        <Tab.Screen name="Community"
         component={CommunityStackScreen}
         options={{
          tabBarLabel:'Community',
          tabBarIcon:({color,size })=>(
            <Icon name="users" color={color} size={25}/>
          )
          
          
        }}
          />
      </Tab.Navigator>
    
    );
  }
}

