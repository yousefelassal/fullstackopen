import { Dimensions, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepoList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import BodyMassIndexCalculator from './BodyMass';
import WhatIsMyPlatform from './WhatIsMyPlatform';
import RepoPage from './RepoPage';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  const { height } = Dimensions.get('window');
  return (
    <View style={{
      ...styles.container,
      height,
    }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bmi" element={<BodyMassIndexCalculator />} />
        <Route path="/form" element={<ReviewForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/:id" element={<RepoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatIsMyPlatform />
    </View>
  );
};

export default Main;