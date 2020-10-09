

import React, { Component } from 'react';
import { View, Text,TouchableOpacity ,StyleSheet,Dimensions,Button,Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

 

var db = SQLite.openDatabase(
    {
      name: 'stopped.db',
    });
class Message extends Component {
  constructor(props) {
    super(props);
   // this._simple=this._simple.bind(this);
    this.state = {
        message_value:'',
        message_id:'',
        
    };
  }

  componentDidMount(){
    db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM ami_messages',[],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {
              this.setState( {message_id: results.rows.item(0).id});
              this.setState( {message_value: results.rows.item(0).message});
            
            } else {
              alert('No user found');
            }
          }
        );
      });

      
  }

  simple(that) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ami_messages',[],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState( {message_id: results.rows.item(0).id});
            this.setState( {message_value: results.rows.item(0).message});
          
          } 
        }
      );
    });
  }



  

  
  render() {

    const update_message=()=> {
      const { message_value ,message_id}  = this.state ;
        //let value= this.state.message_value;
        //let id=this.state.message_id;
        var that =this;
        db.transaction(function (tx) {
            
            tx.executeSql(
              "SELECT id FROM ami_messages",
              [],
              function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                  tx.executeSql(
                    'INSERT INTO ami_messages (message) VALUES (?)',
                    [message_value],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);
                      if (results.rowsAffected > 0) {
                        
                        Alert.alert(
                          'Success',
                          'You are Message Insert Successfully'
                          
                        );
                        that.simple();
                      } else alert('Insert Failed');
                    }
                  );
                }
                else{
                  console.log(message_id);
                tx.executeSql(
                 
                  'UPDATE ami_messages set message=? where id=?',
                  [message_value,message_id],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      Alert.alert(
                        'Success',
                        'Your message has been successfully updated'
                        
                      );

                      that.simple();
                      
                      //this.props.navigation.navigate;
                    } else alert(' Update Failed');
                  }
                );
                }
              })
          },[]);
          this.props.navigation.goBack();
    }
    

    return (
      <View>
        <TextInput multiline={true} textAlignVertical={'top'} onChangeText={message_value => this.setState({message_value})}style={{ height:150, borderColor: 'gray', borderWidth: 1,marginLeft:20,marginRight:20,marginTop:20}}>{this.state.message_value}</TextInput>
        <TouchableOpacity onPress={update_message} style={styles.appButtonContainer2}>
        <Text style={{textAlign:'center',padding:5,marginBottom:5,fontSize:25,color:'#fff',fontWeight:'900'}}>Save</Text>
        </TouchableOpacity> 
        
       
      </View>
    );
  }
}

export default Message;
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
      height:40,
      paddingTop:0,
      position:'relative',
      top:10
  
      },
    title1: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color:'#2a2a2a',
      height:40,
      paddingTop:0,
      position:'relative',
      top:40
  
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
      top:32,
      backgroundColor:'#2a2a2a',
  
    },
    appButtonContainer2: {
      
      justifyContent:'center',
      alignSelf:'center',
      position:'absolute',
      top:200,
      backgroundColor:'#5c946e',
      height:50,
      width:Dimensions.get("window").width/1.1,
      margin:10
    },
    appButtonText: {
      fontSize: 25,
      paddingTop:10,
      color: "#2a2a2a",
      fontWeight:'400',
      alignSelf: 'flex-start',
      fontFamily:'Roboto',
      width :Dimensions.get("window").width/1.12,
      height:40
  
      
      
      
      
    }
  });
  
  
