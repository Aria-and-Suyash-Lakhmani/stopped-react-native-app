import React from 'react';
import { View,Text,SafeAreaView,ScrollView,StyleSheet,TouchableOpacity,Linking} from 'react-native';
import { WebView }from 'react-native-webview';
// import { Container } from './styles';



function RightsScreen({navigation}) {
   
  var htmlContent= '<style>h3{font-size:50px;padding-left:10}p{font-size:35px;padding-left:15px}li{font-size:35px;padding-left:10}h4{font-size:50px;padding-left:10}</style><h3>Select a scenario</h3>'+
  '<ul>'+
  '<li><u><a href="#pulled">I’ve been pulled over by the police</a></u></li>'+
  '<li><u><a href="#stop">I’ve been stopped by the police in public</a></u></li>'+
  '<li><u><a href="#police">The police are at my door</a></u></li>'+
  '<li><u><a href="#arrest">I’ve been arrested by the police</a></u></li>'+
  '<li><u><a href="#violated">The police violated my rights</a></u></li>'+
  '</ul>'+
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
  
  '</ul>'+
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
  '</ul>'+
  '<h3 id="stop">I’ve been stopped by the police in public</h3>'+
  '<h4>Your rights</h4>'+
  '<ul>'+
  '<li>You have the right to remain silent. For example, you do not have to answer any questions about where you are going, where you are traveling from,'+ 
  'what you are doing, or where you live. If you wish to exercise your right to remain silent, say so out loud. (In some states, you may be required to provide'+ 
  'your name if asked to identify yourself, and an officer may arrest you for refusing to do so.)</li>'+
  '<li>You do not have to consent to a search of yourself or your belongings, but police may pat down your clothing if they suspect a weapon. Note that'+
   'refusing consent may not stop the officer from carrying out the search against your will, but making a timely objection before or during the search can'+
   ' help preserve your rights in any later legal proceeding.</li>'+
  '<li>If you are arrested by police, you have the right to a government-appointed lawyer if you cannot afford one.</li>'+
  '<li>You do not have to answer questions about where you were born, whether you are a U.S. citizen, or how you entered the country. (Separate rules apply at'+ 'international borders and airports as well as for individuals on certain nonimmigrant visas, including tourists and business travelers).</li>'+
  '</ul>'+
  '<h4>How to reduce risk to yourself</h4>'+
  '<ul>'+
  '<li>Stay calm. Don’t run, resist, or obstruct the officers. Do not lie or give false documents. Keep your hands where the police can see them.</li>'+
  '</ul>'+
  '<h4>What to do if you are arrested or detained</h4>'+
  '<ul>'+
  '<li>Say you wish to remain silent and ask for a lawyer immediately. Don’t give any explanations or excuses. Don’t say anything, sign anything, or make any'+ 'decisions without a lawyer.</li>'+
  '<li>If you have been arrested by police, you have the right to make a local phone call. The police cannot listen if you call a lawyer. They can and often do'+ 'listen if you call anyone else.</li>'+
  '</ul>'+
  '<h4>If you believe your rights were violated</h4>'+
  '<ul>'+
  '<li>Write down everything you remember, including officers’ badges and patrol car numbers, which agency the officers were from, and any other details. Get'+ 'contact information for witnesses.</li>'+
  '<li>If you’re injured, seek medical attention immediately and take photographs of your injuries.</li>'+
  '<li>File a written complaint with the agency’s internal affairs division or civilian complaint board. In most cases, you can file a complaint anonymously if'+ 'you wish.</li>'+
  '</ul>'+
  '<h4>What you can do if you think you’re subject to or witnessing police abuse or brutality</h4>'+
  '<ul>'+
  '<li>Stand at a safe distance and, if possible, use your phone to record video of what is happening. As long as you do not interfere with what the officers'+ 'are doing and do not stand close enough to obstruct their movements, you have the right to observe and record events that are plainly visible in public'+ 'spaces.</li>'+
  '<li>Do not try to hide the fact that you are recording. Police officers do not have a reasonable expectation of privacy when performing their jobs, but the'+ 'people they are interacting with may have privacy rights that would require you to notify them of the recording. In many states (see <a href='+'"https://www.rcfp.org/reporters-recording-guide">here</a>) you must affirmatively make people aware that you are recording them.</li>'+
  '<li>Police officers may not confiscate or demand to view your photographs or video without a warrant, and they may not delete your photographs or video'+ 'under any circumstances. If an officer orders you to stop recording or orders you to hand over your phone, you should politely but firmly tell the officer'+ 'that you do not consent to doing so, and remind the officer that taking photographs or video is your right under the First Amendment. Be aware that some'+ 'officers may arrest you for refusing to comply even though their orders are illegal. The arrest would be unlawful, but you will need to weigh the personal'+ 'risks of arrest (including the risk that officer may search you upon arrest) against the value of continuing to record.</li>'+
  '<li>Whether or not you are able to record everything, make sure to write down everything you remember, including officers’ badge and patrol car numbers,'+ 'which agency the officers were from, how many officers were present and what their names were, any use of weapons (including less-lethal weapons such as'+ 'Tasers or batons).</li>'+
  '</ul>'+
  '<h3 id="police">The police are at my door</h3>'+
  '<h4>Your rights and how to reduce risk to yourself</h4>'+
  '<ul>'+
  '<li>You should not invite the officer into your house. Talk with the officers through the door and ask them to show you identification. You do not have to'+ 
  'let them in unless they can show you a warrant signed by a judicial officer that lists your address as a place to be searched or that has your name on it'+ 
  'as the subject of an arrest warrant .</li>'+
  '<li>Ask the officer to slip the warrant under the door or hold it up to the window so you can read it. A search warrant allows police to enter the address'+ 'listed on the warrant, but officers can only search the areas and for the items listed. An arrest warrant has the name of the person to be arrested.</li>'+
  '<li>Even if officers have a warrant, you have the right to remain silent. You should not answer questions or speak to the officers while they are in your'+ 'house conducting their search. Stand silently and observe what they do, where they go, and what they take. Write down everything you observed as soon as you'+ 'can.</li>'+
  '</ul>'+
  '<h4>When your rights have been violated</h4>'+
  '<ul>'+
  '<li>Write down everything you remember, including officers’ badge and patrol car numbers, which agency the officers were from, and any other details. Get'+ 'contact information for witnesses.</li>'+
  '<li>File a written complaint with the agency’s internal affairs division or civilian complaint board. In most cases, you can file a complaint anonymously if'+ 'you wish.</li>'+
  '</ul>'+
  '<h4>How to be a responsible bystander</h4>'+
  '<ul>'+
  '<li>If you are a guest inside the house and end up answering the door, you should make clear to the police that you are a guest and do not have the'+ 'authority to let them inside without the homeowner’s permission.</li>'+
  '</ul>'+
  '<h3 id="arrest">I’ve been arrested by the police</h3>'+
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
  '</ul>'+
  '<h4>When your rights have been violated</h4>'+
  '<ul>'+
  '<li>Write down everything you remember, including officers’ badge and patrol car numbers, which agency the officers were from, and any other details. Get contact information for witnesses.</li>'+
  '<li>File a written complaint with the agency’s internal affairs division or civilian complaint board. In most cases, you can file a complaint anonymously if'+ 'you wish.</li>'+
  '</ul>'+
  '<h4>What you can do if you think you’re witnessing police abuse or brutality</h4>'+
  '<ul>'+
  '<li>Stand at a safe distance and, if possible, use your phone to record video of what is happening. As long as you do not interfere with what the officers'+
   'are doing and do not stand close enough to obstruct their movements, you have the right to observe and record events that are plainly visible in public'+ 
   'spaces.</li>'+
  '<li> Do not try to hide the fact that you are recording. Police officers do not have a reasonable expectation of privacy when performing their jobs, but the people they'+ 
  'are interacting with may have privacy rights that would require you to notify them of the recording.In many states (see <a href="https://www.rcfp.org/reporters-recording-guide">here</a>) you must affirmatively make people aware that you are recording them.Police officers may '+
  'notconfiscate or demand to view your photographs or video without a warrant, and they may not delete your photographs or video under any circumstances. If an officer orders you to stop recording or orders you to hand over your phone, you should politely but firmly tell the officer that you do not consent to doing '+
  'so, and remind the officer that taking photographs or video is your right under the First Amendment. Be aware that some officers may arrest you for refusing '+
  'to comply even though their orders are illegal. The arrest would be unlawful, but you will need to weigh the personal risks of arrest (including the risk that officer may search you upon arrest) against the value of continuing to record.Whether or not you are able to record everything, make sure to write down everything you remember, including officers’ badge and patrol car numbers, which agency the officers were from, how many officers were present and what'+
  'their names were, any use of weapons (including less-lethal weapons such as Tasers or batons), and any injuries suffered by the person stopped. </li>'+
  '</ul>'+
  '<h4 id="violated">The police violated my rights</h4>'+
  '<ul>'+
  '<li>When you can, write down everything you remember, including the officers’ badge and patrol car numbers and the agency they work for.</li>'+
  '<li>Get contact information for witnesses.</li>'+
  '<li>If you’re injured, seek medical attention immediately and take photographs of your injuries.</li>'+
  '<li>File a written complaint with the agency’s internal affairs division or civilian complaint board.</li>'+
  '</ul>'+
  '<h4>Additional resources</h4>'+
  '<p>If you need more information, contact your local ACLU affiliate.'+
  'Credit for this section: <a href="https://www.aclu.org/know-your-rights/stopped-by-police/">https://www.aclu.org/know-your-rights/stopped-by-police/</a>'+
  '</p>'
  
  

    return (
      
   /*   <WebView
       style={styles.container}
       javaScriptEnabled={true}
       domStorageEnabled={true}
       source={{ html: htmlContent  }}
 />*/
<View style={{flex: 1, flexDirection:'column'}}>
 <View style={{flex: 1, flexDirection:'row'}}>
  <View style={{flex: 1, flexDirection:'column'}}>
  <View style={{flex: 1}}>
  <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('PulledOver')}>
  <Text style={styles.text}> I have been pulled over</Text>
      
  </TouchableOpacity>
    </View>
    <View style={{flex: 1}}>
    <TouchableOpacity  style={styles.button} onPress={() =>navigation.navigate('Stopped')}>
  <Text style={styles.text} > I have been stopped by the police</Text>
      
  </TouchableOpacity>
    </View>
    <View style={{flex: 1}}>
    <TouchableOpacity  style={styles.button} onPress={() =>navigation.navigate('Door')}>
  <Text style={styles.text}> The police are at my door</Text>
      
  </TouchableOpacity>
  </View>
  </View>
    <View style={{flex: 1, flexDirection:'column'}}>
    <View style={{flex: 1}}>
    <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Arrest')}>
  <Text style={styles.text}> I have been arrested</Text>
      
  </TouchableOpacity>
    </View>
    <View style={{flex: 1}}>
    <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Violated')}>
  <Text style={styles.text}> The police violated my rights</Text>
      
  </TouchableOpacity>
    </View>
    <View style={{flex: 1}}>
    <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Misconduct')}>
  <Text style={styles.text}> Witnessing police misconduct</Text>
      
  </TouchableOpacity>
    </View>
    
  </View>

</View>
<View style={{flex:0.1,flexDirection:'row'}}>

<TouchableOpacity style={{width:'95%',borderRadius:10,margin:10,height:'75%',justifyContent:'center',alignItems:'center',backgroundColor: "#94c4b5"}} onPress={() => {Linking.openURL('https://www.aclu.org/know-your-rights');}}>
<Text style={{color :'#fff'}}> Credit for this section:</Text>
<Text style={{color :'#fff'}}> https://www.aclu.org/know-your-rights</Text>
      
  </TouchableOpacity>
</View>

    
 
 </View>     
    );
  }
  export default RightsScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e5e5e5",
      padding:20,
      paddingLeft:20
      
     
    },
    button :{
      backgroundColor:'#94c4b5',
      justifyContent:'center',
      alignItems:'center',
      height:'85%',
      borderRadius:10,
      margin:20
    },
    text:{
      fontSize:20,
      textAlign:'center',
      fontWeight:'900',
      fontFamily:'Roboto',
      padding:5,
      color:'#fff'
    }
    
  });
  