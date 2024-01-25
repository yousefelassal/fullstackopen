import { Text, Pressable, Alert } from 'react-native';

const PressableText = props => {
  return (
    <Pressable
      className="rounded-lg bg-yellow-400 shadow-md"
      onPress={() => Alert.alert('You pressed the text!')}
    >
      <Text>You can press me</Text>
    </Pressable>
  );
};

export default PressableText;