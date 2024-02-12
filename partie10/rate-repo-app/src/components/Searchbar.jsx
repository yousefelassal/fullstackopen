import { Searchbar } from 'react-native-paper';

export default function SearchbarComponent({value, setValue}) {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setValue}
      value={value}
    />
  )
}