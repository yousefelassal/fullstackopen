### a Introduction to React Native

Eslint configs
```json
{
  "plugins": ["react", "react-native"],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "@babel/eslint-parser",
  "env": {
    "react-native/react-native": true
  },
  "rules": {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

### b React Native basics

- [Core Components](https://reactnative.dev/docs/intro-react-native-components) | React Native Docs

  | React Native UI Component | Android View   | iOS View         | Web Analog              | Description                                                                                           |
  | ------------------------- | -------------- | ---------------- | ----------------------- | ----------------------------------------------------------------------------------------------------- |
  | `<View>`                  | `<ViewGroup>`  | `<UIView>`       | A non-scrolling `<div>` | A container that supports layout with flexbox, style, some touch handling, and accessibility controls |
  | `<Text>`                  | `<TextView>`   | `<UITextView>`   | `<p>`                   | Displays, styles, and nests strings of text and even handles touch events                             |
  | `<Image>`                 | `<ImageView>`  | `<UIImageView>`  | `<img>`                 | Displays different types of images                                                                    |
  | `<ScrollView>`            | `<ScrollView>` | `<UIScrollView>` | `<div>`                 | A generic scrolling container that can contain multiple components and views                          |
  | `<TextInput>`             | `<EditText>`   | `<UITextField>`  | `<input type="text">`   | Allows the user to enter text                                                                         |
  - [All Core Components and APIs](https://reactnative.dev/docs/components-and-apis)
  - [Community Components - Native Directory](https://reactnative.dev/docs/components-and-apis)
    
  ![diagram_react-native-components_dark](https://github.com/yousefelassal/fullstackopen/assets/76617202/79ff26ce-e3b1-409d-9608-e8dba0c044ac)

- [FlatList](https://reactnative.dev/docs/flatlist) | React Native Docs

  Example:
  ```jsx
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
  const App = () => {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </SafeAreaView>
    );
  };

  ```
  To render multiple columns, use the `numColumns` prop. Using this approach instead of a `flexWrap` layout can prevent conflicts with the item height logic.
