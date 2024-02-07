import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepoList';

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Rate Repository Application</Text>
      <RepositoryList />
      <StatusBar style="auto" />
    </View>
  );
};

export default Main;