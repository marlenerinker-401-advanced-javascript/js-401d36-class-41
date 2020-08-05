import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking } from 'react-native'
import * as Battery from 'expo-battery';

const If = props => {
  return props.condition ? props.children : null;
};

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
    let roundBattery = Math.round(batteryLevel * 100)
    setBattery(roundBattery);
    _subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBattery(Math.round(batteryLevel * 100));
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
        <Text style={{alignSelf: 'center',
          color: 'red',
          fontSize: 30,
          padding: 3,}} >Current Battery Level:</Text>
          <If condition={battery >= 50}>
        <Text style={{alignSelf: 'center',
          color: 'green',
          fontSize: 30,
          padding: 3,}}>{battery} %</Text>
          </If>
          <If condition={battery < 50}>
        <Text style={{alignSelf: 'center',
          color: 'red',
          fontSize: 30,
          padding: 3,}}>{battery} %</Text>
          </If>
      </View>
  );
}

const styles = StyleSheet.create({
  box1: {
    flex: 0.7,
    borderWidth: 5,
    borderColor: '#ff6502',
    margin: 20,
    width: '99%',
  },

  
});