import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CallContacts from './components/call-contacts.js';
import TextContacts from './components/text-contacts.js';
import UseCalendar from './components/calendar.js';
import SeeBattery from './components/battery.js';
import UseCamera from './components/camera.js';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {

  const [ task, setTask ] = useState('');

  function toggleAction(action) {
    setTask(action);
  }

  const If = props => {
    return props.condition ? props.children : null;
  };


  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.heading}>Marlene's Little Phone App</Text>
      <Button style={styles.taskButton} title='Make a Call' onPress={() => toggleAction('call')}/>
      <Button style={styles.taskButton} title='Send a Text' onPress={() => toggleAction('text')}/>
      <Button style={styles.taskButton} title='See Calendar' onPress={() => toggleAction('calendar')}/>
      <Button style={styles.taskButton} title='See Battery Level' onPress={() => toggleAction('battery')}/>
      <Button style={styles.taskButton} title='Use Camera View' onPress={() => toggleAction('camera')}/>
      <If condition={task === 'call'}>
      <CallContacts />
      </If>
      <If condition={task === 'text'}>
      <TextContacts />
      </If>
      <If condition={task === 'calendar'}>
      <UseCalendar />
      </If>
      <If condition={task === 'battery'}>
      <SeeBattery />
      </If>
      <If condition={task === 'camera'}>
      <UseCamera />
      </If>
      <StatusBar style="auto" />  
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    
  },

  heading: {
    textAlign: 'center',
    color: '#6202ab',
    fontSize: 30,    
  },
});
