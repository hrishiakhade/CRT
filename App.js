/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PushNotificationAndroid from 'react-native-push-notification'

import {  StackNavigator, NavigationAction,} from 'react-navigation';

import Home from './Home';
import Profile from './Profile';
import Qrscan from './Qrscan';
import Timeset from './Timeset';
import Status from './Status';
import PushController from './PushController';

const Navigation=StackNavigator({
  Profile:{
    screen:Profile,
  },
  Home:{
    screen:Home,
  },
  Qrscan:{
    screen:Qrscan,
  },
  
 
  Timeset:{
    screen:Timeset,
  },
  Status:{
    screen:Status,
  },
 PushController:{
   screen:PushController,
 }
})

export default Navigation;

