import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepoItem from './RepoItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES)

  if (error) {
    return <View><Text>Error: {error.message}</Text></View>
  }

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  const repositoryNodes = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepoItem repo={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;