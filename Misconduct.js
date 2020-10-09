import * as React from 'react';
import { Button, View, Text ,StyleSheet} from 'react-native';
import { WebView }from 'react-native-webview';

export default function Misconduct() {

  var htmlContent ='<style>h3{font-size:50px;padding-left:10;}p{font-size:35px;padding-left:15px}li{font-size:35px;padding-left:10}h4{font-size:50px;padding-left:10}</style>' +
    '<h4>What you can do if you think you’re witnessing police abuse or brutality</h4>'+
    '<ul>'+
    '<li>Stand at a safe distance and, if possible, use your phone to record video of what is happening. As long as you do not interfere with what the officers'+ 
    'are doing and do not stand close enough to obstruct their movements, you have the right to observe and record events that are plainly visible in public'+ 'spaces.</li>'+
    '<li>Do not try to hide the fact that you are recording. Police officers do not have a reasonable expectation of privacy when performing their jobs, but'+
     'the people they are interacting with may have privacy rights that would require you to notify them of the recording. In many states (including California)'+ 
     'you must affirmatively make people aware that you are recording them.</li>'+
    '<li>Police officers may not confiscate or demand to view your photographs or video without a warrant, and they may not delete your photographs or video'+
    'under any circumstances. If an officer orders you to stop recording or orders you to hand over your phone, you should politely but firmly tell the officer'+
    'that you do not consent to doing so, and remind the officer that taking photographs or video is your right under the First Amendment. Be aware that some'+ 
    'officers may arrest you for refusing to comply even though their orders are illegal. The arrest would be unlawful, but you will need to weigh the personal'+ 
    'risks of arrest (including the risk that officer may search you upon arrest) against the value of continuing to record.</li>'+
    '<li>Whether or not you are able to record everything, make sure to write down everything you remember, including officers’ badge and patrol car numbers,'+ 
    'which agency the officers were from, how many officers were present and what their names were, any use of weapons (including less-lethal weapons such as'+ 
    'Tasers or batons), and any injuries suffered by the person stopped. </li>'+
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