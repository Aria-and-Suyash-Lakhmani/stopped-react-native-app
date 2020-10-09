import * as React from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import { WebView }from 'react-native-webview';

export default function Pulled_Over() {

    var htmlContent ='<style>h3{font-size:50px;padding-left:10;}p{font-size:35px;padding-left:15px}li{font-size:35px;padding-left:10}h4{font-size:50px;padding-left:10}</style>' +
    '<h3 id="pulled">I’ve been pulled over by the police</h3>'+
    '<h4>Your rights</h4>'+
    '<ul>'+
    '<li>Both drivers and passengers have the right to remain silent.</li>'+
    '<li>If you’re a passenger, you can ask if you’re free to leave. If yes, you may silently leave.</li>'+
    '</ul>'+
    '<h4>How to reduce risk to yourself</h4>'+
    '<ul>'+
    '<li>Stop the car in a safe place as quickly as possible.</li>'+
    '<li>If you’re a passenger, you can ask if you’re free to leave. If yes, you may silently leave.</li>'+
    '<li>Turn off the car, turn on the internal light, open the window part way, and place your hands on the wheel. If you’re in the passenger seat, put your'+ 'hands on the dashboard.</li>'+
    '<li>Upon request, show police your driver’s license, registration, and proof of insurance.</li>'+
    '<li>Avoid making sudden movements, and keep your hands where the officer can see them.</li>'+
    '</ul>'+
    '<h4>What to do if you are arrested or detained</h4>'+
    '<ul>'+
    '<li>Say you wish to remain silent and ask for a lawyer immediately. Don’t give any explanations or excuses. Don’t say anything, sign anything, or make any'+ 'decisions without a lawyer.</li>'+
    '<li>If you have been arrested by police, you have the right to make a local phone call. The police cannot listen if you call a lawyer. They can and often'+ 'will listen to a call made to anyone else.</li>'+
    '</ul>'+
    '<h4>If you believe your rights were violated</h4>'+
    '<ul>'+
    '<li>Write down everything you remember, including officers’ badges and patrol car numbers, which agency the officers were from, and any other details. Get'+ 'contact information for witnesses.</li>'+
    '<li>If you’re injured, seek medical attention immediately and take photographs of your injuries.</li>'+
    '<li>File a written complaint with the agency’s internal affairs division or civilian complaint board. In most cases, you can file a complaint anonymously if'+ 'you wish.</li>'+
    
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