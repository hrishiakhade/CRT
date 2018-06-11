import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AppState
  } from 'react-native';
  import { NavigationActions } from 'react-navigation';
  import { Container, Header, Left, Body, Right, Title ,Button,Content,Card, CardItem} from 'native-base';
  import PushNotification from 'react-native-push-notification';
  import PushController from './PushController';
export default class Home extends Component {
    static navigationOptions = {
      title: 'Conference Room Tracker',
      headerStyle: { backgroundColor: 'green' },
      headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
    headerLeft: null
     
    }
    constructor(props){
      super(props)
      this.handleAppStateChange = this.handleAppStateChange.bind(this);
      this.state={
        room:this.props.navigation.state.params.room,
        cur_hour:this.props.navigation.state.params.cur_hour,
        cur_minute:this.props.navigation.state.params.cur_minute,
        hour:this.props.navigation.state.params.hour,
        minute:this.props.navigation.state.params.minute,
      }
    }
    componentDidMount() {
      AppState.addEventListener('change', this.handleAppStateChange);
    }
    
      
    
    componentWillUnmount() {
      AppState.removeEventListener('change', this.handleAppStateChange);
     
      }
    
    
    handleAppStateChange(appState) {
      if (appState === 'background') {
        var sec=this.state.hour*3600 + this.state.minute*60;
       
        
        var cur_sec=this.state.cur_hour*3600 + this.state.cur_minute*60
        var diff=sec-cur_sec;
        
        let date = new Date(Date.now() + ((diff-60) * 1000));
        //alert(date);
    
        if (Platform.OS === 'ios') {
          date = date.toISOString();
        }
    
        PushNotification.localNotificationSchedule({
          ticker: "My Notification Ticker",
          title: "Hurry Up !!",
          message: "Only few minutes left...",
          date,
          color:'green',
          //actions: '["Dismiss", "Extend"]',
          vibrate: true,
           vibration: 3000,
           largeIcon: "ic_launcher",
           smallIcon: "ic_notification",
           userInteraction: true,
           foreground:false,
           
           

          
        });

      }
    }
   release=()=> {
     //PushNotification.clearAllNotifications();
    PushNotification.cancelAllLocalNotifications();    
  
    }
   
    render() {
      return (
        
        <Container style={{backgroundColor:'white',}}>
        <Content padder>
        <Card style={{marginLeft:10,marginTop:20,marginRight:10,borderColor:'green'}}>
            <CardItem header >
              <Text style={{fontSize:30,fontWeight:'bold',color:'black'}}>Booking Details </Text>
            </CardItem>
            <CardItem >
        <Text style={styles.text}>Conference Room No. <Text style={{color:'black'}}>{this.state.room}</Text></Text>
        </CardItem>
        <CardItem>
        <Text style={styles.text}>is booked from Time </Text>
        </CardItem>
        <CardItem>
        <Text style={styles.text}>
         <Text style={{color:'black',marginLeft:33}}>{this.state.cur_hour}:{this.state.cur_minute}</Text> To  <Text style={{color:'black'}}>{this.state.hour}:{this.state.minute}</Text></Text>
        </CardItem>
        </Card>
        
        <Button rounded danger large style={{alignItems:'center',width:250,alignSelf:'center',marginTop:40,paddingLeft:100}} 
        onPress={()=>this.release()}>
          <Text style={{fontWeight:'bold',fontSize:20}}>Release Room</Text></Button>

          <Button rounded danger large style={{alignItems:'center',width:250,alignSelf:'center',marginTop:40,paddingLeft:100}}
           onPress={()=>this.props.navigation.navigate("Home")}>
          <Text style={{fontWeight:'bold',fontSize:20}}>Home</Text></Button>

          <PushController />
         
          
          </Content>
        </Container>
      );
    }
  }
  const styles = StyleSheet.create({
    text:{
        
        fontWeight:'bold',
        fontSize:20,
        alignSelf:'center',
        marginLeft:28,
        justifyContent:'center'
        
      }
  });