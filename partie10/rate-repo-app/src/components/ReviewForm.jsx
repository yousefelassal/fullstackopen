import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import { CREATE_REVIEW } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: null,
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('owner name is required')
  ,
  repositoryName: yup
    .string()
    .required('repository name is required'),
  rating: yup
    .number()
    .required('rating is required')
    .min(0, 'Rating must be greater than 0')
    .max(100, 'Rating must be less than 100'),
  text: yup
    .string()
})

const CreateReview = () => {
  const navigate = useNavigate()

  const [createReview, {error}] = useMutation(CREATE_REVIEW, {
    onCompleted(data) {
      navigate(`/${data.createReview.repositoryId}`)
    }
  })
  
  const onSubmit = async (values) => {
    const {
      ownerName,
      rating,
      repositoryName,
      text
    } = values
    try {
      await createReview({ variables: {
        ownerName: ownerName,
        rating: parseInt(rating),
        repositoryName: repositoryName,
        text: text
        }})
    } catch (e) {
      console.log(e)
    }  
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => 
        <View style={styles.container}>
          <FormikTextInput name="ownerName" placeholder="Repo Owner Name" />
          <FormikTextInput name="repositoryName" placeholder="Repo Name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" keyboardType="numeric" />
          <FormikTextInput name="text" placeholder="Review" multiline />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create Review</Text>
          </Pressable>
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      }
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    gap: 10
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default CreateReview