import { React } from 'react';
import { Platform, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: Platform.select({
        android: 'green',
        ios: 'blue',
        web: 'darkorange',
        default: 'black'
    }),
  },
});

const WhatIsMyPlatform = () => {
  return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
};

export default WhatIsMyPlatform;