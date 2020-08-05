import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

export default function UseCalendar() {

  const [calendar, setCalendar] = useState([]);
  const [permissions, setPermissions] = useState(false);
  

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CALENDAR);
      await setPermissions(status === 'granted' ? true : false);
      if (permissions === true) {
        console.log('about to get calendar')
        const calendars = await Calendar.getDefaultCalendarAsync();
        await setCalendar(calendars);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  

  return (
    <View style={styles.box1}>
      <Text style={styles.heading}>Calendar functionality is not available yet.</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  box1: {
    flex: 0.7,
    borderWidth: 5,
    borderColor: '#ff6502',
    margin: 10,
    width: '99%%',
  },

  heading: {    
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 3,
  },

  
});

