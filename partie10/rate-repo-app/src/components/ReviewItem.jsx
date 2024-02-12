import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../theme'

const ReviewItem = ({ review, myReviews = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.flexColumn}>
        <Text style={styles.title}>
          {myReviews ? review.repository.fullName : review.user.username}
        </Text>
        <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 10
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    textAlign: 'center',
    lineHeight: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingText: {
    textAlign: 'center',
    color: theme.colors.primary
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    alignItems: 'flex-start',
    flex: 1
  },
  title: {
    fontWeight: 'bold'
  },
  date: {
    color: theme.colors.textSecondary
  }
})

export default ReviewItem