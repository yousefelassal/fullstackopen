import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepoItem from './RepoItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Loader from './Loader';
import OrderPicker from './OrderPicker';
import { useState } from 'react';
import Searchbar from './Searchbar';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [order, setOrder] = useState('created')
  const [value, setValue] = useState('')
  const [search] = useDebounce(value, 500)

  const pickerVariables = 
    order === 'CREATED' ? {orderBy: 'CREATED_AT', orderDirection: 'DESC'}
  : order === 'HIGHEST_RATED' ? {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
  : order === 'LOWEST_RATED' ? {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
  : null

  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: {
      ...pickerVariables,
      searchKeyword: search
    },
    fetchPolicy: 'cache-and-network',
  });

  const repositoryNodes = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    console.log('You have reached the end of the list');
  }

  return (
    <>
    <Searchbar value={value} setValue={setValue} />
    {error && <Text>Error: {error.message}</Text>}
    {loading ? 
      <View style={{ gap: 10 }}>
        {Array.from({ length: 10 }).map((_, i) => <Loader key={i} />)}
      </View>
    : repositoryNodes.length === 0 && !loading ? <Text>No repositories found</Text>
    :
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepoItem repo={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <OrderPicker order={order} setOrder={setOrder} /> }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
    }
    </>
  );
};

export default RepositoryList;