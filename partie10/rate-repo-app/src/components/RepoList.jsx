import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepoItem from './RepoItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Loader from './Loader';
import OrderPicker from './OrderPicker';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [order, setOrder] = useState('created')

  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: 
      order === 'CREATED' ? {orderBy: 'CREATED_AT', orderDirection: 'DESC'}
    : order === 'HIGHEST_RATED' ? {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
    : order === 'LOWEST_RATED' ? {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
    : null,
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <View><Text>Error: {error.message}</Text></View>
  }

  if (loading) {
    return (
      <View style={{ gap: 10 }}>
        {Array.from({ length: 10 }).map((_, i) => <Loader key={i} />)}
      </View>
    )
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
      ListHeaderComponent={() => <OrderPicker order={order} setOrder={setOrder} /> }
    />
  );
};

export default RepositoryList;