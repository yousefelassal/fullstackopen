import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepoList';
import Text from './Text';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  listContainer: {
    padding: 10,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.listContainer}>
        <RepositoryList />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Main;