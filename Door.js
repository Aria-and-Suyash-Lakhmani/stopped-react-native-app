import * as React from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import { WebView }from 'react-native-webview';

export default function Door() {
    var htmlContent= '<style>h3{font-size:50px;padding-left:10}p{font-size:35px;padding-left:15px}li{font-size:35px;padding-left:10}h4{font-size:50px;padding-left:10}</style>' +
    '<h3 id="police">The police are at my door</h3>'+
  '<h4>Your rights and how to reduce risk to yourself</h4>'+
  '<ul>'+
  '<li>You should not invite the officer into your house. Talk with the officers through the door and ask them to show you identification. You do not have to'+ 
  'let them in unless they can show you a warrant signed by a judicial officer that lists your address as a place to be searched or that has your name on it'+ 
  'as the subject of an arrest warrant .</li>'+
  '<li>Ask the officer to slip the warrant under the door or hold it up to the window so you can read it. A search warrant allows police to enter the address'+ 'listed on the warrant, but officers can only search the areas and for the items listed. An arrest warrant has the name of the person to be arrested.</li>'+
  '<li>Even if officers have a warrant, you have the right to remain silent. You should not answer questions or speak to the officers while they are in your'+ 'house conducting their search. Stand silently and observe what they do, where they go, and what they take. Write down everything you observed as soon as you can.</li>'+
  '</ul>'+
  '<h4>How to be a responsible bystander</h4>'+
  '<ul>'+
  '<li>If you are a guest inside the house and end up answering the door, you should make clear to the police that you are a guest and do not have the'+ 'authority to let them inside without the homeowner’s permission.</li>'+
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