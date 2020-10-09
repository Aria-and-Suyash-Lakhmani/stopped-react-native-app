import * as React from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import { WebView }from 'react-native-webview';

export default function Arrest() {
    var htmlContent ='<style>h3{font-size:50px;padding-left:10}p{font-size:35px;padding-left:15px}li{font-size:35px;padding-left:10}h4{font-size:50px;padding-left:10}</style>' +
    '<h3 id="arrest">I’ve been arrested</h3>'+
  '<h4>How to prepare for possible arrest</h4>'+
  '<ul>'+
  '<li>Prepare yourself and your family in case you are arrested. Memorize the phone numbers of your family and your lawyer. Make emergency plans if you have'+ 'children or take medication.</li>'+
  '</ul>'+
  '<h4>Your rights</h4>'+
  '<ul>'+
  '<li>Say you wish to remain silent and ask for a lawyer immediately. Don’t answer any questions or give any explanations or excuses. If you can’t pay for a'+ 'lawyer, you have the right to a free one. Don’t say anything, sign anything or make any decisions without a lawyer.</li>'+
  '<li>You have the right to make a local phone call. The police cannot listen if you call a lawyer. They can and often will listen to a call made to anyone'+ 'else.</li>'+
  '</ul>'+
  '<h4>How to reduce risk to yourself</h4>'+
  '<ul>'+
  '<li>Do not resist arrest, even if you believe the arrest is unfair. Follow the officers’ commands.</li>'+
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