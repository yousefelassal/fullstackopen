import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import { useSignIn } from '../hooks/useSignIn'
import AuthStorage from '../utils/authStorage'
import { useNavigate } from 'react-router-native'

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()
  
  const onSubmit = async (values) => {
    const { username, password } = values
    try {
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
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
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
  }
})

export default SignIn