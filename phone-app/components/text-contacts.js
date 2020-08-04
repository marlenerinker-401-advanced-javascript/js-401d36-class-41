import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';




export default function TextContacts() {
  const [contacts, setContacts] = useState([]);
  const [permissions, setPermissions] = useState(false);
  
  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setPermissions(status === 'granted' ? true : false);
  }
  
  const showContacts = async () => {
    const contactList = await Contacts.getContactsAsync();
    setContacts(contactList.data);
  }
  
  const text = (contact) => {
    console.log(contact);
    let phoneNumber = contact.phoneNumbers[0].digits;
    for (let i = 0; i < contact.phoneNumbers.length; i++) {
      if (contact.phoneNumbers[i].label === "mobile" || contact.phoneNumbers[i].label === "iPhone") {
        phoneNumber = contact.phoneNumbers[i].digits;
        break;
      }
    }
    let phoneLink = `sms:${phoneNumber}`;
    Linking.canOpenURL(phoneLink)
      .then(isSupported => Linking.openURL(phoneLink))
      .catch(console.error);
  }
  
  useEffect(() => {
    getPermissions();
  }, []);

  return (
      <View style={styles.box1}>
        <Text style={styles.heading}>Text Someone</Text>
        <Button color='#4db848'
          onPress={showContacts}
          title="Show Contacts"
        />
        <FlatList 
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Button 
                title={item.name}
                onPress={() => text(item)}
              />
            )
          }}
        />
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
  },

  
});