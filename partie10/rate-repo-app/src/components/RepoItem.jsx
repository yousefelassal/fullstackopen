import { View, StyleSheet, Image, Pressable, Linking, Alert } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { useNavigate } from 'react-router-native'
import { useCallback } from 'react'

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
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default function RepoItem({ repo, singleView = false }) {
  const navigate = useNavigate()
  const roundNumber = (number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k'
    }
    return number
  }

  if (singleView) {

    const openLink = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(repo.url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(repo.url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${repo.url}`);
      }
    }, [repo.url]);

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
        <Pressable
          style={styles.button}
          onPress={openLink}
        >
          <Text style={styles.buttonLabel}>Open in GitHub</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigate(`/${repo.id}`)}
    >
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
    </Pressable>
  )
}