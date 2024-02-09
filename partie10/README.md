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

  #### [FlashList](https://shopify.github.io/flash-list/) | Shopify Performant Alternative

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

  ---

  Example with `extraData`:
  ```jsx
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
  );
  
  const App = () => {
    const [selectedId, setSelectedId] = useState();
  
    const renderItem = ({item}) => {
      const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
      const color = item.id === selectedId ? 'white' : 'black';
  
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={backgroundColor}
          textColor={color}
        />
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    );
  };
  ```
  - By passing `extraData={selectedId}` to FlatList we make sure FlatList itself will re-render when the state changes. Without setting this prop, FlatList would not know it needs to re-render any items because it is a PureComponent and the prop comparison will not show any changes.
  - `keyExtractor` tells the list to use the ids for the react keys instead of the default key property.

- [StyleSheet](https://reactnative.dev/docs/stylesheet) | React Native Docs

  an abstraction similar to CSS StyleSheets

  ```jsx
  import React from 'react';
  import {StyleSheet, Text, View} from 'react-native';
  
  const App = () => (
    <View style={styles.container}>
      <Text style={styles.title}>React Native</Text>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#eaeaea',
    },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: '#20232a',
      borderRadius: 6,
      backgroundColor: '#61dafb',
      color: '#20232a',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
  
  export default App;
  ```
  - [React Native Styling Cheat Sheet](https://github.com/vhpoet/react-native-styling-cheat-sheet) | GitHub Repo README

  ---
  
  `style` prop also accepts an array of objects. In the case of an array, the objects are merged from left to right so that latter-style properties take precedence.
  ```jsx
  const styles = StyleSheet.create({
    text: {
      color: 'grey',
      fontSize: 14,
    },
    blueText: {
      color: 'blue',
    },
    bigText: {
      fontSize: 24,
      fontWeight: '700',
    },
  });
  
  const FancyText = ({ isBlue, isBig, children }) => {
    const textStyles = [
      styles.text,
      isBlue && styles.blueText,
      isBig && styles.bigText,
    ];
  
    return <Text style={textStyles}>{children}</Text>;
  };
  
  const Main = () => {
    return (
      <>
        <FancyText>Simple text</FancyText>
        <FancyText isBlue>Blue text</FancyText>
        <FancyText isBig>Big text</FancyText>
        <FancyText isBig isBlue>
          Big blue text
        </FancyText>
      </>
    );
  };
  ```

- [ScrollView](https://reactnative.dev/docs/scrollview) | React Native Docs

  ```jsx
  const App = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView horizontal style={styles.scrollView}>
          <Text style={styles.text}>
            Lorem ipsum
          </Text>
          <Text style={styles.text}>
            Lorem ipsum
          </Text>
          <Text style={styles.text}>
            Lorem ipsum
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  };
  ```

#### Routing
- [NativeRouter](https://reactrouter.com/en/main/router-components/native-router) | React Router Docs

  React Router but Native
  ```jsx
  import { NativeRouter } from "react-router-native";

  function App() {
    return (
      <NativeRouter>
        {/* The rest of your app goes here */}
      </NativeRouter>
    );
  }
  ```

  - [Expo Router](https://docs.expo.dev/router/create-pages/) | Expo Docs

    file based routing similar to nextjs
    
- [`<Link>` Native](https://reactrouter.com/en/main/components/link-native) | React Router Docs

  renders a [`TouchableHighlight`](https://reactnative.dev/docs/touchablehighlight). To override default styling and behaviour.

  ```jsx
  import { Link } from "react-router-native";

  function Home() {
    return (
      <View>
        <Text>Welcome!</Text>
        <Link to="/profile">
          <Text>Visit your profile</Text>
        </Link>
      </View>
    );
  }
  ```

#### Form State Management
- [<Formik />](https://formik.org/docs/api/formik) | Formik Docs

  Example:
  ```jsx
  import { Formik } from 'formik';
   
   const BasicExample = () => (
     <div>
       <h1>My Form</h1>
       <Formik
         initialValues={{ name: 'jared' }}
         onSubmit={(values, actions) => {
            // ...
         }}
       >
         {props => (
           <form onSubmit={props.handleSubmit}>
             <input
               type="text"
               onChange={props.handleChange}
               onBlur={props.handleBlur}
               value={props.values.name}
               name="name"
             />
             {props.errors.name && <div id="feedback">{props.errors.name}</div>}
             <button type="submit">Submit</button>
           </form>
         )}
       </Formik>
     </div>
   );
   ```

- [`useField()`](https://formik.org/docs/api/useField) | Formik Docs

  ```jsx
  const BodyMassIndexForm = ({ onSubmit }) => {
    const [massField, massMeta, massHelpers] = useField('mass');
    const [heightField, heightMeta, heightHelpers] = useField('height');
  
    return (
      <View>
        <TextInput
          placeholder="Weight (kg)"
          value={massField.value}
          onChangeText={text => massHelpers.setValue(text)}
        />
        <TextInput
          placeholder="Height (m)"
          value={heightField.value}
          onChangeText={text => heightHelpers.setValue(text)}
        />
        <Pressable onPress={onSubmit}>
          <Text>Calculate</Text>
        </Pressable>
      </View>
    );
  };
  ```
  - [field object](https://formik.org/docs/api/useField#fieldinputpropsvalue): contains the value of the field
  - [meta object](https://formik.org/docs/api/useField#fieldmetapropsvalue): contains field meta information such as a possible error message
  - [helpers object](https://formik.org/docs/api/useField#fieldhelperprops): contains different actions for changing the state of the field such as the `setValue` function. 

- [`<Field />`](https://formik.org/docs/api/field) | Formik Docs

  ```jsx
  <Form>
     <Field type="email" name="email" placeholder="Email" />
     <Field as="select" name="color">
       <option value="red">Red</option>
       <option value="green">Green</option>
       <option value="blue">Blue</option>
     </Field>
  </Form>
  ```
#### Form Validation
- [yup](https://github.com/jquense/yup)
- [zod](https://zod.dev/)
