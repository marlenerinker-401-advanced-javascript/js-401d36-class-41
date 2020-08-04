import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';




export default function callContacts() {
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
  
  const call = (contact) => {
    console.log(contact);
    let phoneNumber = contact.phoneNumbers[0].digits;
    let phoneLink = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneLink)
      .then(isSupported => Linking.openURL(phoneLink))
      .catch(console.error);
  }
  
  useEffect(() => {
    getPermissions();
  }, []);

  return (
      <View style={styles.box1}>
        <Button
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
                onPress={() => call(item)}
              />
            )
          }}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  box1: {
    flex: 0.9,
    borderWidth: 2,
    borderColor: 'blue',
    margin: 10,
    width: '100%',
  }
});