import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Keyboard,BackHandler, NetInfo
} from 'react-native';

import {  StackNavigator,} from 'react-navigation';

import { Container, Header, Left, Body, Right, Title ,Button,Content,Form, Item, Input, Label} from 'native-base';


export default class Profile extends Component {
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
  headerTitleStyle: { color: 'white' },
   
  }
 
  constructor(props, context) {
    super(props, context);

    this.state = {
                      
                      name:'',
                      email:'',
                      mobile:'',
                               
          }
};

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
  
submit=async()=>{

  if( this.state.name=="" || this.state.email=="" || this.state.mobile=="" ){
    alert("Please Fill in All the Fields");
}
else{
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  var Value1 = this.state.mobile.length.toString() ;
    if(reg.test(this.state.email) === false){
    alert( "Please Enter Valid Email");
    }else if(Value1!=10){
      alert('Please Enter 10 Digit Valid Mobile Number')
    }else{
      Keyboard.dismiss();
      Alert.alert("Success", "Congratulation !! Your Info has been successfully saved !");
      this.props.navigation.navigate("Home");
    }

}

}


  render() {
    //const { navigate } = this.props.navigation;
    
    return (
      
      <Container style={{backgroundColor:'white'}}>
      
        <Image source={require('./logo.png')} style={{marginLeft:90,marginTop:30}}/>
<Content style={{marginTop:10}}>
        <Form >
            <Item floatingLabel>
              <Label style={{fontSize:20,}}>Name</Label>
              <Input style={{fontSize:20,}}  onChangeText={(name) => this.setState({name})} value={this.state.name} />
            </Item>
            <Item floatingLabel last>
                  <Label style={{fontSize:20}}>Email ID</Label>
              <Input keyboardType={'email-address'} style={{fontSize:20,}} onChangeText={(email) => this.setState({email})} value={this.state.email} />
            </Item>
            <Item floatingLabel last>
              <Label style={{fontSize:20}}>Mobile Number</Label>
              <Input keyboardType={'phone-pad'} style={{fontSize:20}} onChangeText={(mobile) => this.setState({mobile})} value={this.state.mobile} />
            </Item>
            <Button rounded success  style={{marginTop:40,alignItems:'center',width:150,
    alignSelf:'center',}} onPress={() => this.props.navigation.navigate("Home") } >
            <Text style={styles.text}>{'      '}Save Info</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    alignItems:'center',
    width:250,
    alignSelf:'center',
    
  },
  text:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    alignSelf:'center'
  }
});
