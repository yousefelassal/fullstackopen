import { View, Text, FlatList } from 'react-native'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'
import ReviewItem from './ReviewItem'

export default function MyReviews() {
  const {data, loading, error} = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true }
  })

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || []

  return (
    <View>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error.message}</Text>}
        {reviews.length === 0 && !loading && <Text>No reviews found</Text>}
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} myReviews={true} />}
          keyExtractor={item => item.id}
        />
    </View>
  )
}