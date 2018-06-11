import React, { Component } from 'react';
import Alert from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
    //alert( 'Hurry Up ! Only few minutes left ..', notification );
   // this.props.navigation.navigate("Timeset");

      },

       permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    });



  }

  render() {
    return null;
  }
}