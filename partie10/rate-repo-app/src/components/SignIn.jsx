import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const onSubmit = values => {
    console.log('Submit', values)
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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