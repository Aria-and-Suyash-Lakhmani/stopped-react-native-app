import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageManage from './components/PageManage';
import PageManageNext from './components/PageManage_Next';
import Welcome from './components/Welcome';
import SplashScreen from 'react-native-splash-screen';

import AsyncStorage from '@react-native-community/async-storage'

export default class App extends Component {
  navigationOptions = {
    
 }
  constructor(props) {
    super(props);
    this.state = {
      isFirstLaunch:null
    };
  }
  componentDidMount(){
    setTimeout(()=>{
      SplashScreen.hide();
    },3000)
    
    
    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value==null){
       // AsyncStorage.setItem('alreadyLaunched','true');
        this.setState({isFirstLaunch:true});
      }else{
        this.setState({isFirstLaunch:false});
      }
      
    });
  }
  

  render() {
    
    const Stack = createStackNavigator();

    
   
    if(this.state.isFirstLaunch==null){
      return null;
    }
    else if(this.state.isFirstLaunch==true){
    return (
      <NavigationContainer >
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false,headerLeft:null}} />
        <Stack.Screen  
      
         name="App" component={PageManage} options={{headerLeft:null,headerShown: false}}
        
        
         />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }else{
    return (

    <NavigationContainer>
    <PageManageNext/>
    </NavigationContainer>
    )
  }
  }
}

