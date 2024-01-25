import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import PressableText from './src/PressableText';

export default function App() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Text className="text-4xl text-white">Hello World!</Text>
      <PressableText />
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        className="border rounded-lg bg-white/40 text-white"
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text
          .split(' ')
          .map(word => word && '🍕')
          .join(' ')}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
