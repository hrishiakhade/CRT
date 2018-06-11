import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, NetInfo,Alert,
  BackHandler,
  TouchableOpacity,
  TimePickerAndroid,
  TouchableWithoutFeedback,
  div,
  
} from 'react-native';

import {Button} from 'native-base';

type Props = {};
export default class Timeset extends Component<Props> {
    static navigationOptions = {
        title: 'Conference Room Tracker',
        headerStyle: { backgroundColor: 'green' },
        headerTintColor: 'white',
      headerTitleStyle: { color: 'white' },
       
      }

 
  constructor(Props){
    super(Props)
    this.state={
        //room:this.props.navigation.state.params.room,
      hr:'',
      min:'',
      isValidated: false,
       room:489,
       cur_hour:'',
       cur_minute:'',
       date:''
    };
    
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
componentDidMount() {
    setInterval( () => {
      this.setState({
        hour3 : new Date().toLocaleString()
      })
    },1000)
  }
 

 async renderTimePicker ()  { 
  var date,sum;
  date=new Date();
  cur_hour=date.getHours();
  cur_minute=date.getMinutes();
  sum=cur_hour*60+cur_minute;
 
  //alert(sum);
  //alert(hour+" "+minute);

    
    const {action, hour, minute} = await TimePickerAndroid.open({
    
      hour: 0,
      minute: 0,
      is24Hour: true, // Will display '2 PM'
    });
    if (action !==  TimePickerAndroid.dismissedAction) {
      // Selected hour (0-23), minute (0-59)
        //alert("Hour :"+hour+" Minutes : "+minute);
        

        if(sum< hour*60 + minute){
         //await this.setState({hr:' 9'}).done;
         this.setState({isValidated: true});
          this.setState({min:minute.toString()});
          this.setState({hr:hour.toString()});
          this.setState({cur_minute:cur_minute.toString()});
          this.setState({cur_hour:cur_hour.toString()});
          //hr=hour;     

        // alert("Time is set"+hour.toLocaleString());
        }else{
          alert("Please choose Valid Time");
          this.setState({isValidated:false});

        }
        
    }
 

} 
updateText = () => {
  this.setState({hr: hr})
}
bookRoom = () =>{
  if(this.state.hr!= '' && this.state.min != ''){
  Alert.alert("Confirmation","Are you sure you want to book this room ?.",
  [
    {
      text:'Cancel'
    },
    {text:'Yes',onPress:()=>this.props.navigation.navigate("Status",{
      room:456,
      cur_hour:this.state.cur_hour.toString(),
      cur_minute:this.state.cur_minute.toString(),
      hour:this.state.hr.toString(),
      minute:this.state.min.toString()
    })}
  ]
)}
else{
  alert("Please choose valid time.");
}
}

  render() {
    const { Navigation } = this.props;
    
    
    
    return (
      <View style={{ flex: 1 ,marginTop:30,alignItems:'center',justifyContent:'center',
      backgroundColor:'white'}}>
   
        <Text style={styles.text}>Room no is {this.state.room}</Text>

        
     <Text style={styles.text}>Time From :  {this.state.hour3}</Text>
      
     <Button  rounded success onPress={this.renderTimePicker.bind(this)} style={styles.button}>
     <Text style={styles.text}>Time To </Text>
    
       </Button> 

      <Text style={styles.text}> 
      {this.state.isValidated ? "Time To : "+ this.state.hr + " :" +  this.state.min : "" } </Text>
      
         <Button  rounded success  style={styles.button} onPress={this.bookRoom} >
     <Text style={styles.text} >Book </Text>
    
       </Button> 

      </View>
      
      
      );
   }
  }
  const styles = StyleSheet.create({
    text:{
        
        fontWeight:'bold',
        fontSize:20,
        alignSelf:'center',
        marginLeft:40,
        
      },
      button:{
        alignItems:'center',
        width:150,
        alignSelf:'center',
        marginTop:30
      },
});