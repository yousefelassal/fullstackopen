import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import { useSignIn } from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import { CREATE_USER } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password did not match')
    .required('Password confirmation is required')
})

const SignUp = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const [createUser, {error}] = useMutation(CREATE_USER)
  
  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await createUser({ variables: { username, password } })
      await signIn({ username, password })
      navigate('/')
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
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <FormikTextInput name="passwordConfirm" placeholder="Password" secureTextEntry />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignUp