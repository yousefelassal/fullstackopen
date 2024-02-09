import { React } from 'react';
import { Platform, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: Platform.OS === 'android' ? 'green' 
        : Platform.OS === 'ios' ? 'blue' 
        : Platform.OS === 'web' ? 'lightblue'
        : 'black'
  },
});

const WhatIsMyPlatform = () => {
  return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
};

export default WhatIsMyPlatform;