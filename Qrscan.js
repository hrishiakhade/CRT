import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,Alert,
  NetInfo,
  BackHandler
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {  StackNavigator,} from 'react-navigation';

type Props = {};
export default class Qrscan extends Component<Props> {
    static navigationOptions = {
        title: 'Conference Room Tracker',
        headerStyle: { backgroundColor: 'green' },
        headerTintColor: 'white',
      headerTitleStyle: { color: 'white' },
       
      } 

constructor(Props){
    super(Props);
  }

componentDidMount(){
  NetInfo.isConnected.fetch().then(isConnected => {
    //alert('First, is ' + (isConnected ? 'online' : 'offline'));
    if(isConnected==false){
      Alert.alert("No conection","Please check the internet connectivity !!",
      [
        {text:'OK',onPress:()=>BackHandler.exitApp()}
      ]
    )
    }
  });
}
  onSuccess(e) {
    
    /*Linking
      .openURL(e.data)
      .catch(err => console.log('An error occured', err));

      */
      

      if(e.data=="468")
      this.props.navigation.navigate("Timeset",{
        room:e.data
      });
      else{
        alert("Please Scan Valid Conference Room QR Code");
      }
  }
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  
});