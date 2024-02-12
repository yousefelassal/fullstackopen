import { Picker } from '@react-native-picker/picker';

const OrderPicker = ({order, setOrder}) => {
  
  return (
    <Picker
        selectedValue={order}
        onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
    >
        <Picker.Item label="Latest repositories" value="CREATED" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
    </Picker>
  )
}

export default OrderPicker