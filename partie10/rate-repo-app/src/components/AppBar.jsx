import { View, Pressable, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    padding: 10,
    paddingVertical: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;