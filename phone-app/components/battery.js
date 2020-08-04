import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking } from 'react-native'
import * as Battery from 'expo-battery';

export default function seeBattery() {
  const [battery, setBattery] = useState([]);
  let _subscription = null;

  useEffect(() => {
    _subscribe();
    return function cleanup() {
      _unsubscribe();
    }
  }, []);
  
  
  const _subscribe = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBattery(batteryLevel);
    console.log(batteryLevel);
    _subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel({ batteryLevel });
      console.log('batteryLevel changed!', batteryLevel);
    });
  }

  // const _subscribe = async () => {
  //   const batteryLevel = await Battery.getPowerStateAsync();
  //   setBattery(batteryLevel);
  //   console.log(batteryLevel);
  //   _subscription = Battery.addPowerStateListener(({ batteryLevel }) => {
  //     setBatteryLevel({ batteryLevel });
  //     console.log('batteryLevel changed!', batteryLevel);
  //   });
  // }

  
  
  const _unsubscribe = async () => {
    _subscription && _subscription.remove();
    _subscription = null;
  }
  

  return (
      <View style={styles.box1}>
        <Text>Current Battery Level: {battery}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  box1: {
    flex: 0.7,
    borderWidth: 2,
    borderColor: '#ff6502',
    margin: 10,
    width: '100%',
  },

  heading: {    
    color: 'red',
    fontSize: 20,
  }
});