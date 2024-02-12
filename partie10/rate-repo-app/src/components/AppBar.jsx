import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { GET_CURRENT_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    padding: 10,
    paddingVertical: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const { data } = useQuery(GET_CURRENT_USER);
  const currentUser = data?.me;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/" style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Link>
      {currentUser ? (
        <>
          <Link to="/form" style={styles.tab}>
            <Text style={styles.text}>Create a review</Text>
          </Link>
          <Pressable onPress={onSignOut} style={styles.tab}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        </>
        ) : (
          <Link to="/signin" style={styles.tab}>
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      <Link to="/bmi" style={styles.tab}>
        <Text style={styles.text}>BMI</Text>
      </Link>
    </ScrollView>
  </View>;
};

export default AppBar;