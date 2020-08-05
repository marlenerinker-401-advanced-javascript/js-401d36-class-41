import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';


export default function UseCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  useEffect(() => {
    (async () => {
      // const { status } = await Camera.requestPermissionsAsync();
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    
      <View style={styles.container}>
        <Text style={styles.heading}>Camera View</Text>
        
        {hasPermission
          ? <View style={{ flex: 0.5, backgroundColor: '#010101', width: 300, }}>
            <Camera style={{ flex: 1, width: 300, }} type={type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    width: 100,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                  </TouchableOpacity>
              </View>
            </Camera>
          </View>
          : null
        }
       
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 0.7,
    borderWidth: 5,
    borderColor: '#ff6502',
    margin: 20,
    width: '99%',
  },

  heading: {    
    color: 'red',
    fontSize: 20,
    padding: 3,
  },
});