import { View, Text, FlatList, StyleSheet } from 'react-native'
import RepoItem from './RepoItem'
import ReviewItem from './ReviewItem'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries'
import Loader from './Loader'

export default function RepoPage() {
  const { id } = useParams()
  console.log(id)
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id }
  })

  const { data: reviewData, loading:reviewLoading, fetchMore } = useQuery(GET_REVIEWS, {
    variables: {
      id,
      first: 3
    }
  })

  const onEndReach = () => {
    const canFetchMore = !reviewLoading && reviewData?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: reviewData.repository.reviews.pageInfo.endCursor,
        first: 3
      }
    })
  }

  const reviews = reviewData ? reviewData.repository.reviews.edges.map(edge => edge.node) : []

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <FlatList
        data={reviews}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        ListHeaderComponent={() => <RepoItem repo={data.repository} singleView />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
    />
  )
}

const styles = StyleSheet.create({
    seperator: {
        height: 10
    }
})