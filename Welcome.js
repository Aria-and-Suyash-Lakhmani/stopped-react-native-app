import React, { Component } from 'react';
import { View, Text ,TouchableOpacity,Dimensions,StyleSheet,SafeAreaView,ScrollView,StatusBar} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage'
import { WebView }from 'react-native-webview';

   
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  accept=()=> {
    AsyncStorage.setItem('alreadyLaunched','true');
    this.props.navigation.navigate('App'); 
}


  render() {
 
    return (
      
      

<SafeAreaView>
<ScrollView>
<StatusBar backgroundColor={'#5c946e'} barStyle="light-content"></StatusBar>
<View style={{flex:1,padding:15,justifyContent:'flex-start',alignItems:'center',paddingBottom:40}}> 
<Text style={{fontSize:15,color:'#333'}}>
<Text style={styles.header}>End User License Agreement</Text> <Text>(last modified September 2020{"\n"}</Text>
<Text>This End User License Agreement ("Agreement") is a binding agreement between you (You) and the creators of the STOPPED mobile application (the Stopped Team or we).{"\n"}</Text>
<Text>This Agreement governs Your use of the STOPPED mobile application, updates, documentation and all content and services provided by or through that mobile application (collectively, the Application).{"\n"}</Text>
<Text>The Application is licensed, not sold, to You, and we retain all right, title and interest in and to the Application.{"\n"}</Text>
<Text>BY CLICKING THE AGREE BUTTON OR ACCESSING, STREAMING, DOWNLOADING, INSTALLING, OR USING THE APPLICATION, YOU{"\n"}</Text>

ACKNOWLEDGE THAT YOU HAVE READ,UNDERSTAND, ACCEPT, AND AGREE TO BE BOUND BY THIS AGREEMENT; AND (B) REPRESENT THAT YOU ARE 13 YEARS OF AGE OR OLDER. IF YOU DO NOT AGREE TO BE BOUND BY THIS AGREEMENT OR IF YOU ARE YOUNGER THAN 13, DO NOT ACCESS, STREAM, DOWNLOAD, INSTALL OR USE THE APPLICATION, AND DELETE IT FROM YOUR MOBILE DEVICE.{"\n"}{"\n"}


<Text style={styles.header}>1.Your Responsibilities.{"\n"}{"\n"}</Text> You are responsible for Your use of the Application, for any content You generate with the Application, and for any consequences thereof. Do not copy, upload, or share content unless You have the right to do so. The Stopped Team is not responsible for the conduct or content of You or of any other user of the Application{"\n"}{"\n"}
<Text style={styles.header}>2.License to You.{"\n"}{"\n"}</Text>

<Text><Text style={styles.header}>      a. License Grant.{"\n"}{"\n"}</Text>Subject to the terms of this Agreement, the STOPPED team grants You a limited, non-exclusive, non-transferable, revocable, license (the License) to access, stream, download and install the Application on a personal computing device or mobile phone that You own or control (the Mobile Device), and to use the Application solely for Your personal, non-commercial use.{"\n"}{"\n"}</Text>
<Text><Text style={styles.header}>      b. License Restrictions.{"\n"}{"\n"}</Text>Unless otherwise authorized by this Agreement or in a written authorization signed by the STOPPED team, You will not, and You will not permit any other person to:{"\n"}</Text>
<Text>              i. copy the Application;{"\n"}</Text>
<Text>              ii. modify, translate, adapt, or otherwise create derivative works or improvements of the Application;{"\n"}</Text>
<Text>              iii. remove, delete, alter, or obscure any trademarks or any copyright, trademark, patent or other intellectual property or proprietary rights notices from the Application;{"\n"}</Text>
<Text>              iv. transmit, access, or communicate any data that infringes any patent, trademark, trade secret, copyright, publicity right, privacy right, or other proprietary right of the Stopped team or any other person;{"\n"}</Text>
<Text>              v. rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer or otherwise make available the Application or any features or functionality of the Application, to any third party for any reason, including by making the Application available on a network where it is capable of being accessed by more than one device at any time;{"\n"}</Text>
<Text>              vi. reverse engineer, decompile, disassemble, decode or otherwise attempt to derive or gain access to all or any part of the source code of the Application;{"\n"}</Text>
<Text>              vii. impersonate any person or entity or falsely state or otherwise misrepresent Your affiliation with a person or entity;{"\n"}</Text>
<Text>              viii. forge headers or otherwise manipulate identifiers in order to disguise the origin of any transmissions;{"\n"}</Text>
<Text>              ix. transmit, access, or communicate any data that You do not have a right to transmit;{"\n"}</Text>
<Text>              x. interfere with or disrupt any other person;s use of the Application;{"\n"}</Text>
<Text>              xi. violate local, state, national or international law, rules, regulations, executive orders or policies relating to the use of the Application;{"\n"}</Text>
<Text>              xii. transmit, access, or communicate any data that contains software viruses or any other malicious computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; or{"\n"}</Text>
<Text>              xiii. monitor traffic or make search requests in order to accumulate information about individual users.{"\n"}{"\n"}</Text>

<Text style={styles.header}> License to STOPPED Team.{"\n"}{"\n"}</Text>You hereby irrevocably grant to the STOPPED team a nonexclusive, fully paid up, royalty free, perpetual, irrevocable, unlimited, worldwide license to make, have made, copy, modify, create derivative works of, publicly display and perform, use, and otherwise distribute any information that You submit to the Stopped Team using the Application, and to authorize others to do so by means of a sublicense, subject to the limitations in this Agreement and in the Privacy Policy discussed below. Any feedback, comments, or suggestions You may provide regarding the Application is entirely voluntary and the Stopped Team will be free to use such feedback, comments or suggestions as it sees fit without any obligation to You.{"\n"}{"\n"}
<Text> Collection and Use of Your Information; Technical Information.{"\n"}</Text> The collection and use of information You generate or provide in connection with Your access, streaming, downloading, installing or use of the Application is described in the Privacy Policy for this Application (the Privacy Policy). By accessing, streaming, downloading, installing or using this Application, You consent to the Privacy Policy. In summary, in connection with the Application, You may provide the video You take using this App.{"\n"}{"\n"}
<Text style={styles.header}> Report Retention Policy.{"\n"}{"\n"}</Text>

<Text>       a. The STOPPED Team reserves the right to retain indefinitely any Videos You generate, along with any Geo-location Information.{"\n"}</Text>
<Text>       b. Notwithstanding (a) above, STOPPED TEAM is not responsible or liable for the loss or deletion of, the unauthorized access to, or the failure to store any Report. You should keep an alternative back-up copy of any Report or content contained in a report, if retaining a copy is important to You.{"\n"}</Text>
<Text>As described in the Privacy Policy, we may share or disclose part or all of the Video You give us to any person or organization, or directly to the general public.{"\n"}{"\n"}</Text>

<Text style={styles.header}> Geographic Restrictions.{"\n"}{"\n"}</Text>The Application is intended for use by persons only while located within the State of California. This Application may not comply with the laws of other states or countries. If You access or use the Application while outside the State of California, You are responsible for complying with applicable local laws.{"\n"}{"\n"}
<Text style={styles.header}> Not Legal Advice; Know Your Rights Limitations.{"\n"}{"\n"}</Text>The Application contains downloadable content that includes a basic summary of rights for individuals who are interacting with law enforcement agencies within the State of California (Know Your Rights Content). Laws vary among jurisdictions; therefore, this content may not apply outside of the State of California, may not reflect the most recent changes in the law and may not apply to Your individual legal situation. Know Your Rights content, and all other material included in the App, is for educational purposes only, and it is not intended as, nor is it a substitute for, legal advice, and shall not be construed as such by You or anyone else. If You want legal advice, You should not rely on the information You get from this App and should speak with a lawyer to get advice on Your specific situation.{"\n"}{"\n"}
<Text style={styles.header}> Updates.{"\n"}{"\n"}</Text>The STOPPED team may at any time change or eliminate features and functionality of the Application, including through the use of bug fixes, patches and other updates (the Updates). Based on Your Mobile Device settings, when Your Mobile Device is connected to the internet either:(a) the Application will automatically download and install all available Updates; or(b) You may receive notice of or be prompted to download and install available Updates. If You do not promptly download and install all Updates, the Application may not operate properly.{"\n"}{"\n"}
<Text style={styles.header}> Third Party Materials{"\n"}{"\n"}</Text> The Application may display, include or make available third-party content (including data, information, applications and other products services and/or materials) or provide links to third-party websites or services, including through third-party advertising (Third Party Materials). The STOPPED team  is not responsible for Third Party Materials, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect. Further, the STOPPED team does not assume and will not have any liability or responsibility to You or to any other person or entity for any Third Party Materials. Third Party Materials and any links to Third Party Materials are provided solely as a convenience to You and You access and use them at entirely Your own risk and subject to the third parties terms and conditions.{"\n"}{"\n"}
<Text style={styles.header}> Term; Termination; Effect of Termination.{"\n"}{"\n"}</Text>

<Text>      a. The License described in Section 2.a begins when You download the Application and will continue until it has terminated as follows:{"\n"}{"\n"}</Text>
<Text>      i. The License will terminate immediately and automatically without any notice if You violate this Agreement.{"\n"}</Text>
<Text>      ii. The STOPPED Team may terminate the License at any time without notice, for any reason or for no reason, in their sole and absolute discretion.{"\n"}</Text>
<Text>      iii. You may terminate the License at any time by uninstalling the Application.{"\n"}{"\n"}</Text>
<Text>      b. Upon termination of the License, You must stop using the Application and erase the Application from Your Mobile Device.{"\n"}</Text>
<Text>      c. The other provisions of this Agreement will continue in full force and effect after termination of the License. Specifically, termination of the License will not limit the STOPPED tam;s rights or remedies at law or in equity or release You from any claim for breach of the License or other provision of this Agreement that arose before the termination of the License.{"\n"}{"\n"}</Text>
<Text><Text style={styles.header}>    13. No Warranty; No Liability For Damages.{"\n"}{"\n"}</Text></Text>
<Text><Text style={styles.header}>      a. No Warranty.{"\n"}{"\n"}</Text>THE APPLICATION IS PROVIDED <Text>AS IS</Text>, AND the STOPPED Team MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED, WITH RESPECT TO THE APPLICATION, INCLUDING THAT THE APPLICATION WILL BE COMPATIBLE OR WORK WITH ANY DEVICE OR ANY OTHER SOFTWARE, APPLICATIONS, SYSTEMS OR SERVICES, AND WITH RESPECT TO THE KYR CONTENT, INCLUDING THE ACCURACY OF SUCH INFORMATION. STOPPED TEAM, ON ITS OWN BEHALF AND ON BEHALF OF ITS AFFILIATES AND ITS AND THEIR RESPECTIVE LICENSORS AND SERVICE PROVIDERS, EXPRESSLY DISCLAIMS THE WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, NONINFRINGEMENT, FITNESS FOR ANY PARTICULAR PURPOSE, TITLE, COURSE OF DEALING, AND USAGE IN THE TRADE. THESE DISCLAIMERS ARE AN ESSENTIAL PART OF THIS AGREEMENT. STOPPED TEAM CANNOT AND DOES NOT WARRANT THE SERVICES WILL ALWAYS BE SECURE OR ERROR-FREE OR THAT THE SERVICES WILL ALWAYS FUNCTION WITHOUT DELAYS, DISRUPTIONS OR IMPERFECTIONS.{"\n"}{"\n"}</Text>
<Text><Text style={styles.header}>      b. No Liability For Damages.{"\n"}{"\n"}</Text>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL THE STOPPED TEAM, ITS AFFILIATES, OR ANY OF ITS OR THEIR RESPECTIVE LICENSORS OR SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS AND/OR DIRECTORS, BE LIABLE FOR (i) ANY LOST PROFITS, LOSS OF USE, COST OF CURE, DIMINUTION OF VALUE, LOSS OF DATA, OR FOR ANY DIRECT, INCIDENTAL, INDIRECT, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES OF ANY KIND, HOWEVER CAUSED, ARISING OUT OF OR RELATED TO YOUR USE OR MISUSE OF OR INABILITY TO USE THE APPLICATION, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, EVEN IF THOSE DAMAGES WERE FORESEEABLE AND EVEN IF STOPPED TEAM WAS ADVISED OF THE POSSIBILITY OF THOSE DAMAGES; OR (ii) MONEY DAMAGES, HOWEVER CAUSED, ARISING OUT OF OR RELATED TO THIS AGREEMENT OR TO YOUR  USE OR MISUSE OF OR INABILITY TO USE THE APPLICATION, IN AN AMOUNT GREATER THAN $0.01.{"\n"}{"\n"}</Text>
<Text><Text style={styles.header}>   14. Choice of Law; Venue; Injunctive Relief.{"\n"}{"\n"}</Text>   This Agreement will be interpreted under, and any dispute arising out of this Agreement or the Application will be governed by, the laws of the State of California without reference to its conflict of law principles. You consent to the exclusive jurisdiction of and venue in the state and federal courts located in Fremont, California and Alameda County, California and will not assert any claim against STOPPED TEAM in any other courts. Any dispute will be limited to the dispute between STOPPED TEAM and You individually. To the full extent permitted by law, no legal proceeding will be joined with any other or decided on a class-action basis. Breach of this Agreement could cause irreparable injury for which money damages alone would be an inadequate remedy. In that case, a party will, in addition to remedies at law, be entitled to temporary or permanent injunctive or other equitable relief, without the posting of any bond or other security.{"\n"}{"\n"}</Text>
<Text><Text style={styles.header}>   15. Indemnification.{"\n"}{"\n"}</Text>   You (a) will indemnify, defend and hold harmless, and (b) hereby release, STOPPED TEAM , its licensors, and its and their respective officers, directors, members, employees, agents, affiliates, successors and assigns from and against any and all losses, damages, liabilities, deficiencies, claims, actions, judgments, settlements, interest, awards, penalties, fines, obligations, costs and/or expenses (including reasonable legal fees) which result from or arise out of Your use or misuse of the Application or related activities or Your violation of this Agreement. Furthermore, STOPPED TEAM assumes no responsibility for the content You submit or make available through the Application.{"\n"}{"\n"}</Text>
<Text><Text style={styles.header}>   16. Miscellaneous.{"\n"}{"\n"}</Text></Text>

<Text style={styles.header}>     a. Severability.{"\n"}{"\n"}</Text>If any provision of this Agreement is held invalid or unenforceable, in whole or in part, that provision will be modified to the minimum extent necessary to make it valid and enforceable, and the validity and enforceability of all other provisions of this Agreement will not be affected thereby.{"\n"}{"\n"}
<Text style={styles.header}>     b. Entire Agreement.{"\n"}{"\n"}</Text>This Agreement constitutes the entire agreement between You and STOPPED TEAM relating to the subject matter of this Agreement, and it supersedes all prior oral and written and all contemporaneous oral negotiations, commitments and understandings of the parties.{"\n"}{"\n"}
<Text style={styles.header}>     c. Amendments.{"\n"}{"\n"}</Text>STOPPED TEAM may amend this Agreement at any time. Those amendments will be effective upon notice to You or by Your continued used of the Application.{"\n"}{"\n"}
   </Text>
  </View>
 </ScrollView>
   <View>
   <TouchableOpacity onPress={this.accept} style={styles.appButtonContainer2}>
  <Text style={{textAlign:'center',padding:10,marginBottom:5,fontSize:25,color:'#fff',fontWeight:'900'}}>Accept</Text>
  </TouchableOpacity> 
  </View>
   </SafeAreaView>

      
    );
    }
}
const styles = StyleSheet.create({
  
  appButtonContainer2: {
      
    flex:1,
    position:'absolute',
    backgroundColor:'#5c946a',
    bottom:0,
    height:65,
    width:'100%'

  },
  header:{
    fontSize:20,
    color:'#000',
    fontWeight:'bold'
  }
  
  
});