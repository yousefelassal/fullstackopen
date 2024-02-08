import { View, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'react-router-native';

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
    <Link to="/" style={styles.tab}>
      <Text style={styles.text}>Repositories</Text>
    </Link>
    <Link to="/signin" style={styles.tab}>
      <Text style={styles.text}>Sign in</Text>
    </Link>
  </View>;
};

export default AppBar;