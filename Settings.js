import React, {Component} from 'react';
import {StyleSheet,Text, View,Alert,FlatList,TouchableOpacity,Dimensions} from 'react-native';

import {selectContactPhone} from 'react-native-select-contact';
import Icon from 'react-native-vector-icons/FontAwesome';



import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase(
  {
    name: 'stopped.db',
  });


export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts :null,
      contact_name:'',
      number1 :'',
      number2 :'',
      data_call_name:'',
      data_number:'',
      FlatListItems:null,
      modalVisible:false,
      setModalVisible:false,
      message:'',
      message_id:'',
      onRefresh:false,
      currentLongitude:'unknown',
      currentLatitude:'unknown',
    };
    
  }
  
  
  

  componentDidMount(){

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {      
    
 db.transaction((tx) => {
  tx.executeSql(
    'SELECT * FROM ami_call_contacts',[],
    (tx, results) => {
      var len = results.rows.length;
      console.log('len', len);
      if (len > 0) {
        this.setState( {data_call_name : results.rows.item(0).name});
        this.setState( {data_number: results.rows.item(0).number});
      
      } else{
        this.setState( {data_call_name : ''});
        this.setState( {data_number:''});
      }
    }
  );
});

db.transaction((tx) => {
  tx.executeSql(
    'SELECT * FROM ami_geolocation',[],
    (tx, results) => {
      var len = results.rows.length;
      //console.log('len', len);
      if (len > 0) {
        this.setState( {currentLongitude: results.rows.item(0).longitude});
        this.setState( {currentLatitude: results.rows.item(0).latitude});
      
      }
    }
  );
});
db.transaction((tx) => {
  tx.executeSql(
    'SELECT * FROM ami_messages',[],
    (tx, results) => {
      var len = results.rows.length;
      console.log('len', len);
      if (len > 0) {
        this.setState( {message_id: results.rows.item(0).id});
        this.setState( {message: results.rows.item(0).message});
      
      } 
    }
  );
});



db.transaction((tx) => {
  tx.executeSql('SELECT * FROM ami_sms_contacts', [], (tx, results) => {
    var temp = [];
    for (let i = 0; i < results.rows.length; ++i)
      temp.push(results.rows.item(i));
    this.setState({FlatListItems:temp});
  });
});
  

    });
 
   
 

  db.transaction( function (txn) {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS ami_sms_contacts(
        id INTEGER PRIMARY KEY AUTOINCREMENT ,
        name  VARCHAR(100),
        number VARCHAR(20) UNIQUE)`,[]
    );
  });
 
 db.transaction( function (txn) {
   txn.executeSql(
     `CREATE TABLE IF NOT EXISTS ami_call_contacts(
       id INTEGER PRIMARY KEY AUTOINCREMENT ,
       name  VARCHAR(100),
       number VARCHAR(20) UNIQUE)`,[]
   );
 });
 db.transaction( function (txn) {
  txn.executeSql(
    `CREATE TABLE IF NOT EXISTS ami_messages(
      id INTEGER PRIMARY KEY AUTOINCREMENT ,
      message  VARCHAR(4000))`,[]
  );
});

  }
 

  fetch(that){
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ami_call_contacts',[],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState( {data_call_name : results.rows.item(0).name});
            this.setState( {data_number: results.rows.item(0).number});
          
          }else{
            this.setState( {data_call_name : ''});
            this.setState( {data_number:''});
          }
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ami_messages',[],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState( {message_id: results.rows.item(0).id});
            this.setState( {message: results.rows.item(0).message});
          
          } 
        }
      );
    });
    
    
    
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM ami_sms_contacts', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        this.setState({FlatListItems:temp});
      });
    });
  }
  
  
  render () {
/*
    const { update_button,delete_button } = this.state;
    let button1= ( <Text></Text> );
    if (update_button) {
      button1 = (
        <TouchableOpacity onPress={() => delete_item_id(item.id)}  style={styles.appButtonContainer1}>
            
        <Icon name="trash" style={{paddingLeft: 10,paddingRight:10}} size={25} color="#ad2831" />
        </TouchableOpacity>
              
      );
    }
    let button2= ( <Text></Text> );
    if (delete_button) {
      button2 = (
        <TouchableOpacity onPress={() => update_item_id(item.id)} style={styles.appButtonContainer2}>
        <Icon name="edit" style={{paddingLeft: 10,paddingRight:2}} size={25} color="#30c5ff" />
        </TouchableOpacity> 
              
      );
    }
*/
     
     var calling_number;
    const get_contact= async()=>{
       var that =this;
      const selection = await selectContactPhone();
      if (!selection) {
        return null;
      }
      let { contact, selectedPhone } = selection;
      let id=this.state.data_number;
      console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
      calling_number =selectedPhone.number;
      that.setState({number1 : calling_number});
      that.setState({contact_name: contact.name})
      db.transaction(function (tx) {
       
        tx.executeSql(
          "SELECT id FROM ami_call_contacts",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              tx.executeSql(
                'INSERT INTO ami_call_contacts (name ,number) VALUES (?,?)',
                [contact.name, selectedPhone.number],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'Contact number added successfully'
                      
                    );
                    that.fetch();
                    //this.setState({data_call_name : contact.name});
                  } else {
                    Alert.alert(
                      'Warning',
                      'Contact number added failed'
                      
                    );
                  };
                }
              );
            }
            else{
              Alert.alert(
                'Warning',
                'You cannot add more than 1 contacts'
                
              );
            }
          })
      },[]);
      return selectedPhone.number ;
      
      
      }
       const delete_call=()=>{
        var that=this;
        let id=this.state.data_number;
        console.log(this.state.data_number);
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM ami_call_contacts where number=?',
            [id],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
              that.fetch();   
              Alert.alert(
                  'Success',
                  'Deleted Successfully');
              
              } else {
                Alert.alert(
                  
                  'Warning',
                  'Deleted failed');
               
              }
            }
          );
        });

       }
      const update_call=async()=>{


        var that =this;
        const selection = await selectContactPhone();
        if (!selection) {
          return null;
        }
        let { contact, selectedPhone } = selection;
        let id=this.state.data_number;
        console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
        calling_number =selectedPhone.number;
        that.setState({number1 : calling_number});
        that.setState({contact_name: contact.name})
        db.transaction(function (tx) {
         
          tx.executeSql(
            "SELECT id FROM ami_call_contacts",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length > 0) {
                tx.executeSql(
               
                  'UPDATE ami_call_contacts set name=?, number=? where number=?',
                  [contact.name, selectedPhone.number,id],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      
                      Alert.alert(
                        'Success Update',
                        'Your update was successful'
                        
                      );
                      that.fetch();
                     // fetch(that);
                    } else {
                      Alert.alert(
                        'Warning',
                        'Your update was failed'
                        
                      );
                    }
                  }
                );
              } 
              
            })
        },[]);
        return selectedPhone.number ;
       
              
      }

      ///////////////////////////////SMS/////
      const sms_contact= async()=>{
        var that =this;
       const selection = await selectContactPhone();
       if (!selection) {
         return null;
       }
       let { contact, selectedPhone } = selection;
       let id=this.state.data_number;
       console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
       
       
       db.transaction(function (tx) {
        
         tx.executeSql(
           "SELECT id FROM ami_sms_contacts",
           [],
           function (tx, res) {
             console.log('item:', res.rows.length);
             if (res.rows.length <= 2) {
               tx.executeSql(
                 'INSERT INTO ami_sms_contacts (name ,number) VALUES (?,?)',
                 [contact.name, selectedPhone.number],
                 (tx, results) => {
                   console.log('Results', results.rowsAffected);
                   if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'Contact number added successfully'
                      
                    );
                    that.fetch();
                   } 
                   else {
                    Alert.alert(
                      'Warning',
                      'Number already Used'
                      
                    );
                   }
                 }
               );
             }
            else if(res.rows.length >=2){
                Alert.alert(
                  'Warning',
                  'You cannot add more than 3 contacts'
                  
                );
               
              
             }
           })
       },[]);
       return selectedPhone.number ;
       
       
       }


       const update_sms_contacts= async(id)=>{
         
       const selection = await selectContactPhone();
       if (!selection) {
         return null;
       }
       let { contact, selectedPhone } = selection;
       console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
       
       var that=this;
       db.transaction(function (tx) {
              tx.executeSql(
                
                'UPDATE ami_sms_contacts set name=?, number=? where id=?',
                [contact.name, selectedPhone.number,id],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    
                    Alert.alert(
                      'Success Update',
                      'Your update was successful'
                      
                    );
                    that.fetch();
                  } else {
                    Alert.alert(
                      'Update Failed',
                      'Number already used'
                      
                    );
                  };
                }
              );
          
           
       },[]);
       return selectedPhone.number ;
       
       
       }
      
      
      let listViewItemSeparator = () => {
        return (
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#2a2a2a' }}
          />
        );
      };
     const delete_sms_contacts=(id)=> {
        var that=this;
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM ami_sms_contacts where id=?',
            [id],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
              Alert.alert(
                  'Success',
                  'Deleted successfully');
               that.fetch();   
              } else {
                Alert.alert(
                  'Warning',
                  'Invalid contact');
                console.log(item.id);
              }
            }
          );
        });
      };

 function update_item_id(id) {
        Alert.alert(
          'Update Contact to Text',
          'Are you sure want to update this contact ?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => update_sms_contacts(id)},
          ],
          { cancelable: false }
        )
      }      
function delete_item_id(id) {
        Alert.alert(
          'Delete Contact to Text',
          'Are you sure want to delete this contact ?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => delete_sms_contacts(id)},
          ],
          { cancelable: false }
        )
      }
function update_call_contact() {
        Alert.alert(
          'Update Call Contact',
          'Are you sure want to update this contact ?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: update_call},
          ],
          { cancelable: false }
        )
      }      
function delete_call_contact() {
        Alert.alert(
          'Delete Call Contact',
          'Are you sure want to delete this contact ?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress:  delete_call},
          ],
          { cancelable: false }
        )
      }     
      let listItemView = (item) => {
       
        return (
          <View
            key={item.id}
            style={{ backgroundColor: 'white', padding: 10,width:Dimensions.get("window").width }}>
            <Text style={styles.appButtonText}>{item.name}</Text>
            <TouchableOpacity onPress={() => delete_item_id(item.id)}  style={styles.appButtonContainer1}>
            
                <Icon name="trash" style={{paddingLeft: 10,paddingRight:10}} size={25} color="#ad2831" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => update_item_id(item.id)} style={styles.appButtonContainer2}>
                <Icon name="edit" style={{paddingLeft: 10,paddingRight:2}} size={25} color="#30c5ff" />
              </TouchableOpacity> 
          </View>
        );
      };
      let show_button1,show_button2;
      if(this.state.data_call_name!=''){
        show_button1=
        (
         <TouchableOpacity onPress={ ()=>delete_call_contact()}  style={styles.appButtonContainer1}>
             
         <Icon name="trash" style={{paddingLeft: 10,paddingRight:10}} size={25} color="#ad2831" />
       </TouchableOpacity>
       
        );
        show_button2=
        (
          <TouchableOpacity onPress={()=>update_call_contact()} style={styles.appButtonContainer2}>
          <Icon name="edit" style={{paddingLeft: 10,paddingRight:2}} size={25} color="#30c5ff" />
        </TouchableOpacity> 
       
        );
      }
     
      
    
    return (
      
      
      <View style={{...StyleSheet.absoluteFill}}>
      <View style={{ flex: 1,justifyContent:'flex-start',alignItems:'flex-start',...StyleSheet.absoluteFill,top:'2%'}}>
      <Text style={styles.title}>Select contact to call:</Text>
      <View style={{ backgroundColor: 'white',padding:10,width: Dimensions.get("window").width,marginTop:8}}>
      <Text style={styles.appButtonText} >{this.state.data_call_name}</Text>
      {show_button1}{show_button2}
      </View> 

      
      
      <View style={{justifyContent:'flex-end',alignSelf:'flex-end',position:'absolute',padding:10,marginTop:0}}>
      <TouchableOpacity onPress={get_contact}>
                <Icon name="address-book" style={{paddingLeft: 10,paddingRight:10,marginTop:0}} size={25} color="#30c5ff" />
              </TouchableOpacity>
      </View>  
      </View>
          
       <View style={{ flex: 1,justifyContent:'flex-start',alignItems:'flex-start',...StyleSheet.absoluteFill,top:Dimensions.get("window").height/6.5}}>
       <Text style={styles.title1}>Select up to 3 contacts to text:</Text>
       <View style={{justifyContent:'flex-end',alignSelf:'flex-end',position:'absolute',padding:10,marginTop:12}}>
      <TouchableOpacity onPress={sms_contact}>
                <Icon name="address-book" style={{paddingLeft: 10,paddingRight:10}} size={25} color="#30c5ff" />
              </TouchableOpacity>
      </View> 
          <FlatList style={{marginTop:14}}
            data={this.state.FlatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item}) => listItemView(item)}
            
          />
        
       </View>
      <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',...StyleSheet.absoluteFill,top:Dimensions.get("window").height/2}}>
      <Text style={{fontSize:20,marginTop:8,fontFamily:'Roboto',color:'#000',padding:10}}>Call for help:</Text>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')}>
      <Text style={{ marginTop:8,height:140,width:Dimensions.get("window").width/1.1, borderColor:'gray',borderWidth: 1,marginLeft:20,marginRight:20,padding:10}}> 
      {this.state.message}Please click the link below to get my location: https://maps.google.com/?q=XX.XX,XX.XX
      </Text>
      
      </TouchableOpacity>
      </View>
      </View>
      
     
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:30,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#2a2a2a',
    
    paddingTop:0,
    marginTop:5
    

    },
  title1: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#2a2a2a',
    marginTop:18,
    paddingTop:0,
    
    
    

    },
  contact_details: {
    textAlign: 'center',
    color: 'red',
    margin: 10,
  },
  appButtonContainer1: {
    
    justifyContent:'flex-end',
    alignSelf:'flex-end',
    position:'absolute',
    top:18,
    

  },
  appButtonContainer2: {
    
    justifyContent:'flex-end',
    alignSelf:'flex-end',
    position:'absolute',
    top:20,
    
    right:40

  },
  appButtonText: {
    fontSize: 18,
    padding:5,
    color: "#2a2a2a",
    fontWeight:'400',
    alignSelf: 'flex-start',
    fontFamily:'Roboto',
    width :Dimensions.get("window").width/1.12,
    height:40

    
    
    
    
  }
});

