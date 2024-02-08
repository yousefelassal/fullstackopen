import { View, StyleSheet, Image } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    alignItems: 'flex-start'
  },
  lang: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  flexAround: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  flexColumnGap:{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center'
  }
})

export default function RepoItem({ repo }) {
  const roundNumber = (number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k'
    }
    return number
  }
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          style={styles.image}
          source={{ uri: repo.ownerAvatarUrl }}
        />
        <View style={styles.flexColumn}>
          <Text fontSize="subheading" fontWeight="bold">{repo.fullName}</Text>
          <Text color="textSecondary" style={{marginLeft: -4}}> {repo.description}</Text>
          <Text style={styles.lang}>{repo.language}</Text>
        </View>
      </View>
      <View style={styles.flexAround}>
        <View style={styles.flexColumnGap}>
          <Text fontWeight="bold">{roundNumber(repo.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.flexColumnGap}>
          <Text fontWeight="bold">{roundNumber(repo.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.flexColumnGap}>
          <Text fontWeight="bold">{repo.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.flexColumnGap}>
          <Text fontWeight="bold">{repo.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  )
}