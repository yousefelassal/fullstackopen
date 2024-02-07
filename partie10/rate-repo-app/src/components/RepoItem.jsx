import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        gap: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})

export default function RepoItem({ repo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repo.fullName}</Text>
      <Text>{repo.description}</Text>
      <Text>{repo.language}</Text>
      <Text>{repo.stargazersCount}</Text>
      <Text>{repo.forksCount}</Text>
      <Text>{repo.reviewCount}</Text>
      <Text>{repo.ratingAverage}</Text>
    </View>
  )
}