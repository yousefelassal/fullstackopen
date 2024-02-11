import { View, Text } from 'react-native'
import RepoItem from './RepoItem'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

export default function RepoPage() {
  const { id } = useParams()
  console.log(id)
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id }
  })

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <RepoItem repo={data.repository} singleView={true} />
  )
}