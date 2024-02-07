import { View, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    padding: 10,
    paddingVertical: 15,
    fontSize: 20,
    color: 'white',
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable style={styles.tab}>
        Repositories
    </Pressable>
  </View>;
};

export default AppBar;