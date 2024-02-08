import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepoList';
import Text from './Text';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View>
        <RepositoryList />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Main;