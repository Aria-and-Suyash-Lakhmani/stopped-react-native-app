import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Dimensions,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


function CommunityScreen() {
    return (
      <View style={{ flex: 1,...StyleSheet.absoluteFill,justifyContent:'flex-start',alignItems:'center'}}>
        
        <TouchableOpacity onPress={()=>{Linking.openURL('mailto:stopped.app3@gmail.com?subject=&body=');}} style={styles.appButtonContainer1}>
        
        <Text style={styles.appButtonText}>Contact Us</Text>
        <Icon style={{position:'absolute',padding:10,color:'#fff',fontSize:25,right:Dimensions.get("window").width/7}} name="envelope"/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{Linking.openURL('https://stoppedapp.com');}} style={styles.appButtonContainer2}>
        
        <Text style={styles.appButtonText}>See Community Videos</Text>
        <Image source={require('../assets/icon.png')} style={{height:27,width:27,position:'absolute',padding:10,marginTop:10,right:Dimensions.get("window").width/14}}/>
        </TouchableOpacity>
        
      </View>
     

    );
  }

  export default CommunityScreen;
  const styles = StyleSheet.create({
    // ...
    appButtonContainer1: {
      
      backgroundColor: "#94c4b5",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width:Dimensions.get("window").width/1.2,
      marginTop:100
    },
    appButtonContainer2: {
      
      backgroundColor: '#54946e',
     
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width:Dimensions.get("window").width/1.2,
      marginTop:20,
      
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight:'400',
      alignSelf: "center",
      fontFamily:'Roboto',
      
      textAlign:'center',
      marginRight:10
      
      
      
      
    }
  });