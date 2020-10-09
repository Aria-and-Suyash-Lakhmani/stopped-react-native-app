import React, { Component } from 'react';
import { View,ToastAndroid, Alert,Text,TouchableOpacity,Image,ActivityIndicator,Linking,StyleSheet,Dimensions,StatusBar,PermissionsAndroid} from 'react-native';
import { RNCamera } from 'react-native-camera';
import SQLite from 'react-native-sqlite-storage';

import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import RNFetchBlob from 'rn-fetch-blob';
import {S3} from 'aws-sdk';
import {decode} from 'base64-arraybuffer';
import Geolocation from '@react-native-community/geolocation';

var db = SQLite.openDatabase(
  {
    name: 'stopped.db',
  });
var RNFS = require('react-native-fs');
const querystring = require('querystring');


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path :'',
      cameraType: 'front',
      mirrorMode: true,
      data_number:'',
      FlatListItems:null,
      message:'',
      currentLongitude:'unknown',
      currentLatitude:'unknown',
      address:'',
      time: new Date().toLocaleString(),
      folder_name:'',
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      startDisable: false,
      data_single:null,
      video_size:'',
      base64:'',
      uploading:false,
    };
    
   
  }
  

   componentDidMount() {

   
    var that=this;
    this.intervalID =setInterval(()=>this.tick(),1000);
   

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {      
      
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ami_call_contacts',[],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            
            this.setState( {data_number: results.rows.item(0).number});
          
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
        var data = temp.map((item)=>{
         return item['number']
        })
        this.setState({data_single:data});
      });
    });
    
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ami_messages',[],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            
            this.setState( {message: results.rows.item(0).message});
          
          } 
        }
      );
    });
/*
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
    });*/


    Geolocation.getCurrentPosition(
      //Will give you the current location
       (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
       },
       (error) => console.log(error.message),
       { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
       that.setState({ currentLongitude:currentLongitude });
       //Setting state Longitude to re re-render the Longitude Text
       that.setState({ currentLatitude:currentLatitude });
       //Setting state Latitude to re re-render the Longitude Text

       

      db.transaction(function (tx) {
            
        tx.executeSql(
          "SELECT id FROM ami_geolocation",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              tx.executeSql(
                'INSERT INTO ami_geolocation (longitude,latitude) VALUES (?,?)',
                [currentLongitude,currentLatitude],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    
                  /*  Alert.alert(
                      'Success',
                      'GeoLocation Inserted'
                      
                    );*/
                    
                  } 
                }
              );
            }
            
            else{
              
              db.transaction((tx) => {
                tx.executeSql(
                  'SELECT * FROM ami_geolocation',[],
                  (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                      tx.executeSql(
             
                        'UPDATE ami_geolocation set longitude=? ,latitude=? where id=?',
                        [currentLongitude,currentLatitude,results.rows.item(0).id],
                        (tx, results) => {
                          console.log('Results', results.rowsAffected);
                          if (results.rowsAffected > 0) {
                          /*  Alert.alert(
                              'Success Update',
                              'Geolocation update Successfully'
                              
                            );*/
                       //     that.simple();
                          } 
                        }
                      );
                    
                    }
                  }
                );
              });

           
            }
          })
      },[]);

    });
    });

    
  
    RNFS.mkdir(RNFS.ExternalStorageDirectoryPath+'/'+'Stopped');
    
  
 }
  
componentWillUnmount(){
  clearInterval(this.intervalID);
  clearInterval(this.state.timer);
  Geolocation.clearWatch(this.watchID);
}


  
onButtonStart = () => {

  let timer = setInterval(() => {

    var num = (Number(this.state.seconds_Counter) + 1).toString(),
      count = this.state.minutes_Counter;

    if (Number(this.state.seconds_Counter) == 59) {
      count = (Number(this.state.minutes_Counter) + 1).toString();
      num = '00';
    }

    this.setState({
      minutes_Counter: count.length == 1 ? '0' + count : count,
      seconds_Counter: num.length == 1 ? '0' + num : num
    });
  }, 1000);
  this.setState({ timer });

  this.setState({startDisable : true})

  
}
onButtonClear = () => {
  clearInterval(this.state.timer);
  this.setState({
    timer: null,
    minutes_Counter: '00',
    seconds_Counter: '00',
    startDisable: false
  });
}
  
  changeCameraType=()=> {
    
    if (this.state.cameraType === 'front') {
      this.setState({
        cameraType: 'back',
        mirrorMode: false
      });
    } else {
      this.setState({
        cameraType: 'front',
        mirrorMode: true
      });
    }
    console.log('currentLongitude:'+this.state.currentLongitude + 'currentLatitude:'+this.state.currentLatitude)
  }

  
tick(){
  this.setState({
    time : new Date().toLocaleString()
  });
}

upload_video(){
  
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM ami_messages',[],
      (tx, results) => {
        var len = results.rows.length;
        console.log('len', len);
        if (len > 0) {
          
          this.setState( {message: results.rows.item(0).message});
        
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
    )}
  );

  let data = ''
  RNFetchBlob.fs.readStream(
      this.state.path,
     'base64',
      4095)
  .then((ifstream) => {
         ifstream.open()
         ifstream.onData((chunk) => {
       
        data += chunk
      })
         ifstream.onError((err) => {
        console.log('oops', err)
        this.setState({ uploading: false });
        ToastAndroid.show('Video uploading failed',ToastAndroid.SHORT)
      })
        ifstream.onEnd(() => {
          const s3bucket = new S3({
            accessKeyId: "AKIAIKRNQMLH2H6PNVPQ",
            secretAccessKey: "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",
            Bucket: "stopped-app3",
            signatureVersion: 'v4',
          });
          let contentType = 'video/mp4';
          let contentDeposition = 'inline;filename="' + `${this.state.time.replace(/\s/g,'')}.mp4` + '"';
      //const base64 = await RNFS.readFile(this.state.path, 'base64');
          const base64 =data; 
          const arrayBuffer = decode(base64);
         
          const params = {
            Bucket: "stopped-app3",
            Key: `${this.state.time.replace(/\s/g,'')}.mp4`,
            Body: arrayBuffer,
            ContentDisposition: contentDeposition,
            ContentType: contentType,
        }
  
        NetInfo.fetch().then(state => {
  
          if(state.isConnected){
  
            s3bucket.createBucket(() => {
           
              s3bucket.upload(params, (err, data) => {
                if (err) {
                  console.log('error in callback');
                  this.setState({ uploading: false });
                  ToastAndroid.show('Video uploading failed',ToastAndroid.SHORT)
                }
              console.log('success');
              console.log("Response URL : "+ data.Location);
              ToastAndroid.show('Video uploaded successfully',ToastAndroid.SHORT)
              
             fetch('https://stoppedapp.com/upload_video.php',
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(
              {
                  content: `${this.state.message}`,

                  map_location: `https://maps.google.com/?q=${this.state.currentLatitude},${this.state.currentLongitude}`,
  
                  video_url: data.Location
              })

        }).then((response) => response.json()).then((responseJson) =>
        {
            console.log(responseJson);
          this.setState({ uploading: false });
        }).catch((error) =>
        {
            console.error(error);
            this.setState({ uploading: false });
            ToastAndroid.show('Video uploading failed',ToastAndroid.SHORT)
        });

              
                          ///////
              });
            });
          }else{
            this.setState({ uploading: false });
            ALert.alert(
              'Warning',
              'Please check your internet connection'
              )}
        });
       
      })
  })
}

  render() {
    
    if(this.state.minutes_Counter=='15'){
     
      var that=this;
       Alert.alert(
      'Video Record',
      'Do you want to post this video in our community page ?',
      [ 
        {text: 'Yes, post to the Stopped community', onPress: this.stopRecordingAndUpload.bind(this)},
        {text: 'No, do not post to the Stopped Community', onPress: this.stopRecording.bind(this)},
        {text: 'Continue Recording', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        
      ],
      { cancelable: false }
     )
    
      }
     if(this.state.minutes_Counter=='20'){
      send_sms();

      Alert.alert(
        'Video Record',
        'Do you want to post this video in our community page ?',
        [ 
          {text: 'Yes, post to the Stopped community', onPress: this.stopRecordingAndUpload.bind(this)},
          {text: 'No, do not post to the Stopped Community', onPress: this.stopRecording.bind(this)},
          
        ],
        { cancelable: false }
       )
     } 
    
   

    const video_manage=()=>{
      var that=this;
      Alert.alert(
        'Video Record',
        'Do you want to post this video in our community page ?',
        [ 
          {text: 'Yes, post to the Stopped community', onPress: that.stopRecordingAndUpload.bind(that)},
          {text: 'No, do not post to the Stopped Community', onPress: that.stopRecording.bind(that)},
          {text: 'Continue Recording', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          
        ],
        { cancelable: false }
       )
    }
    
    
/*
    const post_status_facebook=()=>{
          
          
          axios 
          .post('https://graph-video.facebook.com/104099384754495/feed',{
           
           access_token:
           "EAAEfpsvo708BABfkyNnDZAcuCuoiZCGfNwCPfopgbfgn6o55LC7GTekFcQ1aUZCCeT9M5UeGaWtKfzYwcgLUqiyV2Aw44ME6fdvm6KBAl1vQUfF7h7je4zdzZCP6f1detZCIs90ZBF8mqceo07H5PVcg60ffuMuZCMkP7Pzaw91aSQpbTZBPeJvrVgID6ATVyqcZD",
           message :'Status Test'

          }).then(
            res=>{
              const result =res.data;
              console.log(result);
              alert('success');
            },
            error=>{
              console.log(error);
            }
          )

    }*/

/*
  const post_video=async()=>{

   //ToastAndroid.show('Sms sent successfully',ToastAndroid.SHORT)
   

    let data = ''
RNFetchBlob.fs.readStream(
    this.state.path,
   'base64',
    4095)
.then((ifstream) => {
       ifstream.open()
       ifstream.onData((chunk) => {
     
      data += chunk
    })
       ifstream.onError((err) => {
      console.log('oops', err)
    })
      ifstream.onEnd(() => {
        const s3bucket = new S3({
          accessKeyId: "AKIAJPJHLGNTEOMWRX6Q",
          secretAccessKey: "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",
          Bucket: "stoppedapp",
          signatureVersion: 'v4',
        });
        let contentType = 'video/mp4';
        let contentDeposition = 'inline;filename="' + `${this.state.time.replace(/\s/g,'')}.mp4` + '"';
    //const base64 = await RNFS.readFile(this.state.path, 'base64');
        const base64 =data; 
        const arrayBuffer = decode(base64);
       
        const params = {
          Bucket: "stoppedapp",
          Key: `${this.state.time.replace(/\s/g,'')}.mp4`,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType,
      }

      NetInfo.fetch().then(state => {

        if(state.isConnected){

          s3bucket.createBucket(() => {
         
            s3bucket.upload(params, (err, data) => {
              if (err) {
                console.log('error in callback');
              }
            console.log('success');
            console.log("Response URL : "+ data.Location);
            ToastAndroid.show('Video uploaded successfully',ToastAndroid.SHORT)
            
          
  
            });
          });
        }else{
          ALert.alert(
            'Warning',
            'Please check your internet connection'
          )
        }
      });


     
    })
})

}*/
 
  
    const send_sms=()=>{

     
    /*
      const username='AC1491a7c9929010633303adfde17b62d2';
      const password='fb0cfaa2381794a18c1d4f7c30ac47f1';
      const token =Buffer.from(`${username}:${password}`,'utf8').toString('base64');
      console.log(token);*/

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM ami_messages',[],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {
              
              this.setState( {message: results.rows.item(0).message});
            
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
    if(this.state.data_single!=null && this.state.message!='' ){
      
      
      this.state.data_single.map((number)=>{
       console.log(`+1${(number.replace(/\s/g,'')).replace('+1','')}`);
        
        NetInfo.fetch().then(state => {

          if(state.isConnected){
            axios 
            .post('https://rest.messagebird.com/messages',querystring.stringify({
             
       
            recipients:`+1${(number.replace(/\s/g,'')).replace('+1','')}`,
            originator:'+12029983435',
            body:`${this.state.message} Please click the link below to get my location: https://maps.google.com/?q=${this.state.currentLatitude},${this.state.currentLongitude}`
              
   
            }),{
             headers:{
               'Authorization':'AccessKey ebbFHJAFTIR8BvA0eveyGKxcj'
              
             }
            }).then((res)=>{
              console.log(res.data);
              ToastAndroid.show(' SMS sent successfully ',ToastAndroid.SHORT)

            }).catch((error)=>{
              console.log( error.response.request._response ) ;
              ToastAndroid.show(' SMS sending failed ',ToastAndroid.SHORT)
            })
          }else{
            Alert.alert(
            'Warning',
            'Please check your internet connection!'
            );
            
          }
          
        });
         
        })

    }
    
      

}

    const { recording, processing } = this.state;

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        
        style={{backgroundColor:'#ad2831',borderRadius:100,height:100,width:100,paddingTop:10}}
      >
        <Text style={{textAlign:'center',padding:5,fontSize:14,color:'#fff',paddingTop:30,fontWeight:'900'}}>Record</Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={video_manage}
          style={{backgroundColor:'#5c946e',borderRadius:100,height:100,width:100,paddingTop:10}}
        >
          <Text style={{textAlign:'center',padding:5,fontSize:14,color:'#fff',paddingTop:30,fontWeight:'900'}}>Recording...</Text>
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }
    
    if(this.state.uploading==true){
      return  (
        <View style={[styles.containerActivity, styles.horizontal]}>
        <StatusBar backgroundColor={'#5c946e'} barStyle="light-content"></StatusBar>
          <ActivityIndicator size={100} color="#5c946e" />
          <Text style={{textAlign:'center',fontSize:20,padding:15}}>Video uploading please wait...</Text>
        </View>
        );
    }
    
    else {

    
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor={'#5c946e'} barStyle="light-content"></StatusBar>
      
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
         // type={RNCamera.Constants.Type.back}
          type={this.state.cameraType}
          flashMode={RNCamera.Constants.FlashMode.on}
          mirrorImage={this.state.mirrorMode}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          
        />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',alignSelf:'center',position:'absolute',bottom:Dimensions.get("window").height/6, }}>
        {button}
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' ,position:'absolute',bottom:'42%'}}>
        <TouchableOpacity
          onPress={this.changeCameraType}
          style={{height:70,width:70}}
          
          
        >
          <Image source={require('../assets/switch-camera.png')} style={{height:50,width:50,alignSelf:'center',padding:5}}/>
        </TouchableOpacity>
        </View>
        <View style={{flex:1,flexDirection: 'row', justifyContent: 'flex-start' ,position:'absolute',bottom:Dimensions.get("window").height/20,left:50}}>
        <TouchableOpacity
          // onPress={this.sendSms.bind(this)}
           onPress={send_sms}
         // onPress={post_video}
           style={{backgroundColor:'#ad2831',borderRadius:100,height:100,width:100}}
        >
           
           <Text style={{textAlign:'center',padding:5,fontSize:14,paddingTop:30,color:'#fff',fontWeight:'900'}}>Text My Contact</Text>
        </TouchableOpacity>
        </View>
        <View style={{ flex:1,flexDirection: 'row', justifyContent: 'flex-end' ,position:'absolute',bottom:Dimensions.get("window").height/20,right:50}}>
        <TouchableOpacity
          onPress={()=>{Linking.openURL(`tel:${this.state.data_number}`);}}
          style={{backgroundColor:'#ad2831',borderRadius:100,height:100,width:100}}
          
          
        >
           
           <Text style={{textAlign:'center',padding:5,fontSize:14,color:'#fff',paddingTop:30,fontWeight:'900'}}>Call My Contact</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    );

  }
  }

  
  
  async startRecording() {
    
   
    
    //console.log(this.state.time);
    this.onButtonStart();
    this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    const { uri, codec = "mp4" } = await this.camera.recordAsync({maxDuration:1200,quality:"720p"});
   // alert(uri);
   
//this.setState({path :uri});
    //console.log('this cache path'+ this.state.path);
    //this.postOnFacebook();
    this.setState({folder_name:(this.state.time).replace(/\s/g,'')});
    let folder_name=this.state.folder_name;
    RNFS.mkdir(RNFS.ExternalStorageDirectoryPath+'/Stopped/'+ folder_name);
    console.log(this.state.folder_name);
    if(folder_name!=''){
      let fileName = 'Stopped.mp4';
    
     RNFS.moveFile(uri, RNFS.ExternalStorageDirectoryPath + '/Stopped/'+folder_name+'/'+ fileName).then(() => {
      this.setState({path :`${RNFS.ExternalStorageDirectoryPath + '/Stopped/'+folder_name+'/'+ fileName}`});
      
        ToastAndroid.show('Recorded video saved successfully',ToastAndroid.SHORT)
        this.onButtonClear();
       
        console.log('the video path->'+ this.state.path);
        console.log(this.state.uploading)
        if(this.state.uploading==true){
          this.upload_video();
        }
        

  
  }, (error) => {
      console.log("CopyFile fail for video: " + error);
      ToastAndroid.show('Recorded video saving failed',ToastAndroid.SHORT)
      this.setState({ uploading: false });
      this.setState({ recording: false });
  })

    }
  
   
}

stopRecording() {
    this.setState({ uploading: false });
    this.camera.stopRecording();
    
    this.setState({ recording: false });
     
}

stopRecordingAndUpload(){
  this.camera.stopRecording();
  this.setState({ recording: false });
  this.setState({ uploading: true });
  
  
    
 
  
}


sendSms(){
  var that=this;
  
  var result =that.state.FlatListItems.map(function(item,index){
    return item['number'];
  })
 

 db.transaction((tx) => {
  tx.executeSql(
    'SELECT * FROM ami_messages',[],
    (tx, results) => {
      var len = results.rows.length;
      console.log('len', len);
      if (len > 0) {
        
        this.setState( {message: results.rows.item(0).message});
      
      } 
    }
  );
});


  
  SendSMS.send({
    
    
    body: `${this.state.message} Please click the link below to get my location: https://www.google.com/maps/@${this.state.currentLatitude},${this.state.currentLongitude},16z`,
    
    recipients: result,
   
    successTypes: ['sent', 'queued']
}, (completed, cancelled, error) => {
    if(completed){
      console.log('SMS Sent Completed');
    }else if(cancelled){
      console.log('SMS Sent Cancelled');
    }else if(error){
      console.log('Some error occurred');
    }
});
}


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    ...StyleSheet.absoluteFill,

  },
  preview: {
    
    width: Dimensions.get("window").width,
    height:Dimensions.get("window").height/2,
    overflow:'hidden'
  },
  capture: {
   
    backgroundColor: "#ad2831",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width:100,
    height:100,
    alignSelf: 'center',
    borderRadius:100
    
    
    
  },
  containerActivity: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10
  }
});
