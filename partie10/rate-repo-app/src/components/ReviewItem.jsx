import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native'
import React from 'react'
import theme from '../theme'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'
import { GET_CURRENT_USER } from '../graphql/queries'

const ReviewItem = ({ review, myReviews = false }) => {
  const navigate = useNavigate()
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_CURRENT_USER, variables: { includeReviews: true } }]
  })

  const handleDelete = async () => {
    try {
      await deleteReview({ variables: { id: review.id } })
    } catch (e) {
      console.log(e)
    }
  }

  const alertWeb = () => {
    window.confirm('Are you sure you want to delete this review?') && handleDelete()
  }

  const confirmDelete = () => {
    Platform.OS === 'web' ? alertWeb() :
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: handleDelete }
      ]
    )
  }

  return (
    <View style={styles.mainContainer}>
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
      {myReviews && (
        <View style={styles.flexButtons}>
          <Pressable style={styles.viewButton} onPress={() => navigate(`/${review.repositoryId}`)}>
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 10,
    padding: 10,
    backgroundColor: 'white'
  },
  container: {
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
  },
  flexButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
  }
})

export default ReviewItem