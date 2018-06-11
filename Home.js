import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Container, Header, Left, Body, Right, Title ,Button,Content} from 'native-base';

import {  StackNavigator,} from 'react-navigation';



export default class Home extends Component {
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
    headerTintColor: 'white',
  headerTitleStyle: { color: 'white' },
   
  }
  
  render() {
    return (
      
      <Container style={{backgroundColor:'white'}}>
      
        
        <Content >
        <Button onPress={() => this.props.navigation.navigate("Status") }
        rounded danger large style={{marginTop:150,alignItems:'center',width:200,
    alignSelf:'center',}} >
             <Text style={styles.text}>{'     '}Booking Details</Text>
          </Button>

        <Button onPress={() => this.props.navigation.navigate("Profile") }
        rounded danger large style={{marginTop:50,alignItems:'center',width:150,
    alignSelf:'center',}} >
             <Text style={styles.text}>{'     '}Edit Profile</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate("Timeset") }
          rounded danger large 
          style={{marginTop:50,alignItems:'center',width:250,alignSelf:'center',}} >
            <Text style={styles.text}>{'  '}Book Conference Room</Text>
          </Button>

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
    alignSelf:'center',
  }
});
