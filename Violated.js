import * as React from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import { WebView }from 'react-native-webview';

export default function Violated() {

    var htmlContent ='<style>h3{font-size:50px;padding-left:10}p{font-size:35px;padding-left:15px}li{font-size:35px;padding-left:10}h4{font-size:50px;padding-left:10}</style>' +
  '<h4 id="violated">The police violated my rights</h4>'+
  '<ul>'+
  '<li>When you can, write down everything you remember, including the officers’ badge and patrol car numbers and the agency they work for.</li>'+
  '<li>Get contact information for witnesses.</li>'+
  '<li>If you’re injured, seek medical attention immediately and take photographs of your injuries.</li>'+
  '<li>File a written complaint with the agency’s internal affairs division or civilian complaint board.</li>'+
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