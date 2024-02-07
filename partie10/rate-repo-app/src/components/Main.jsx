import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepoList';
import Text from './Text';

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
      <Text>Simple text</Text>
      <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
      <Text fontWeight="bold" fontSize="subheading">
        Bold subheading
      </Text>
      <Text color="textSecondary">Text with secondary color</Text>
      <RepositoryList />
      <StatusBar style="auto" />
    </View>
  );
};

export default Main;