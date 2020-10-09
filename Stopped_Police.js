import * as React from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import { WebView }from 'react-native-webview';

export default function Stopped_Police() {

    var htmlContent='<style>h3{font-size:50px;padding-left:10}p{font-size:35px;padding-left:15px}li{font-size:35px;padding-left:10}h4{font-size:50px;padding-left:10}</style>' +
  '<h3 id="stop">I have been stopped by the police </h3>'+
  '<h4>Your rights</h4>'+
  '<ul>'+
  '<li>You have the right to remain silent. For example, you do not have to answer any questions about where you are going, where you are traveling from,'+ 
  'what you are doing, or where you live. If you wish to exercise your right to remain silent, say so out loud. (In some states, you may be required to provide'+ 
  'your name if asked to identify yourself, and an officer may arrest you for refusing to do so.)</li>'+
  '<li>You do not have to consent to a search of yourself or your belongings, but police may pat down your clothing if they suspect a weapon.'+
   '</li>'+
  '<li>If you are arrested by police, you have the right to a government-appointed lawyer if you cannot afford one.</li>'+
  '<li>You do not have to answer questions about where you were born, whether you are a U.S. citizen, or how you entered the country.</li>'+
  '</ul>'+
  '<h4>How to reduce risk to yourself</h4>'+
  '<ul>'+
  '<li>Stay calm. Don’t run, resist, or obstruct the officers. Do not lie or give false documents. Keep your hands where the police can see them.</li>'+
  '</ul>'
  
  return (
    <WebView
       style={styles.container}
       javaScriptEnabled={true}
       domStorageEnabled={true}
       source={{ html: htmlContent  }}
 />
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e5e5e5",
      padding:20,
      paddingLeft:20
      
     
    }
})