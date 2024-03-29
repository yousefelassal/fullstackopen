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

  Example:
  ```jsx
  const validationSchema = yup.object().shape({
    mass: yup
      .number()
      .min(1, 'Weight must be greater or equal to 1')
      .required('Weight is required'),
    height: yup
      .number()
      .min(0.5, 'Height must be greater or equal to 0.5')
      .required('Height is required'),
  });
  ```
  which could be passed to a `<Formik />` component as a prop
  ```jsx
  <Formik validationSchema={validationSchema}>
      // ...
  </Formik>
  ```
#### Platform-specific code

- [Platform](https://reactnative.dev/docs/platform) | React Native Docs
  
  We can access the user's platform through the `Platform.OS` constant
  ```jsx
  import { Platform } from 'react-native';
  
  const WhatIsMyPlatform = () => {
    return (
      <ScrollView>
        <Text>OS</Text>
        <Text style={styles.value}>{Platform.OS}</Text>
        <Text>OS Version</Text>
        <Text style={styles.value}>{Platform.Version}</Text>
        <Text>isTV</Text>
        <Text style={styles.value}>{Platform.isTV.toString()}</Text>
        {Platform.OS === 'ios' && (
          <>
            <Text>isPad</Text>
            <Text style={styles.value}>{Platform.isPad.toString()}</Text>
          </>
        )}
      </ScrollView>
    )
  };
  ```
  - `select()` | React Native Docs

    Returns the most fitting value for the platform you are currently running on.
    ```jsx
    import {Platform, StyleSheet} from 'react-native';

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        ...Platform.select({
          android: {
            backgroundColor: 'green',
          },
          ios: {
            backgroundColor: 'red',
          },
          default: {
            // other platforms, web for example
            backgroundColor: 'blue',
          },
        }),
      },
    });
    ```
    We can even use the Platform.select method to require a platform-specific component:
    ```jsx
    const MyComponent = Platform.select({
      ios: () => require('./MyIOSComponent'),
      android: () => require('./MyAndroidComponent'),
    })();
    
    <MyComponent />;
    ```

  However, a more sophisticated method for implementing and importing platform-specific components (or any other piece of code) is to use the _.ios.jsx_ and _.android.jsx_ file extensions.
  
  We can for example have files _Button.ios.jsx_ and _Button.android.jsx_ which we can import like this:
  ```jsx
  import Button from './Button';
  
  const PlatformSpecificButton = () => {
    return <Button />;
  };
  ```
  Now, the Android bundle of the application will have the component defined in the _Button.android.jsx_ whereas the iOS bundle the one defined in the _Button.ios.jsx_ file.

### c Communicating with server
- [Pagination](https://graphql.org/learn/pagination/) | GraphQL Docs

  There are a number of ways we could do pagination:

  - We could do something like `friends(first:2 offset:2)` to ask for the next two in the list.
  - We could do something like `friends(first:2 after:$friendId)`, to ask for the next two after the last friend we fetched.
  - We could do something like `friends(first:2 after:$friendCursor)`, where we get a cursor from the last item and use that to paginate.

#### Evolving the structure
Once our application grows larger there might be times when certain files grow too large to manage. For example, we have component `A` which renders the components `B` and `C`. All these components are defined in a file _A.jsx_ in a components directory. We would like to extract components `B` and `C` into their own files _B.jsx_ and _C.jsx_ without major refactors. We have two options:

Create files _B.jsx_ and _C.jsx_ in the components directory. This results in the following structure:
```
components/
  A.jsx
  B.jsx
  C.jsx
  ...
```
Create a directory `A` in the components directory and create files _B.jsx_ and _C.jsx_ there. To avoid breaking components that import the _A.jsx_ file, move the _A.jsx_ file to the `A` directory and rename it to _index.jsx_. This results in the following structure:
```
components/
  A/
    B.jsx
    C.jsx
    index.jsx
  ...
```
The first option is fairly decent, however, if components `B` and `C` are not reusable outside the component `A`, it is useless to bloat the components directory by adding them as separate files. The second option is quite modular and doesn't break any imports because importing a path such as _./A_ will match both _A.jsx_ and _A/index.jsx_.

- [fetchPolicy](https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies) | Apollo Docs

  <table class="field-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
  <tr>
  <td>
  
  ###### `cache-first`
  
  </td>
  <td>
  
  Apollo Client first executes the query against the cache. If _all_ requested data is present in the cache, that data is returned. Otherwise, Apollo Client executes the query against your GraphQL server and returns that data after caching it.
  
  Prioritizes minimizing the number of network requests sent by your application.
  
  This is the default fetch policy.
  
  </td>
  </tr>
  
  <tr>
  <td>
  
  ###### `cache-only`
  
  </td>
  <td>
  
  Apollo Client executes the query _only_ against the cache. It never queries your server in this case.
  
  A `cache-only` query throws an error if the cache does not contain data for all requested fields.
  
  </td>
  </tr>
  
  <tr>
  <td>
  
  ###### `cache-and-network`
  
  </td>
  <td>
  
  Apollo Client executes the full query against both the cache _and_ your GraphQL server. The query automatically updates if the result of the server-side query modifies cached fields.
  
  Provides a fast response while also helping to keep cached data consistent with server data.
  
  </td>
  </tr>
  
  <tr>
  <td>
  
  ###### `network-only`
  
  </td>
  <td>
  
  Apollo Client executes the full query against your GraphQL server, _without_ first checking the cache. The query's result _is_ stored in the cache.
  
  Prioritizes consistency with server data, but can't provide a near-instantaneous response when cached data is available.
  
  </td>
  </tr>
  
  <tr>
  <td>
  
  ###### `no-cache`
  
  </td>
  <td>
  
  Similar to `network-only`, except the query's result _is not_ stored in the cache.
  
  </td>
  </tr>
  
  <tr>
  <td>
  
  ###### `standby`
  
  </td>
  <td>
  
  Uses the same logic as `cache-first`, except this query does _not_ automatically update when underlying field values change. You can still _manually_ update this query with `refetch` and `updateQueries`.
  
  </td>
  </tr>
  </tbody>
  </table>

#### Storing data in the user's device

- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/usage) | AsyncStorage Docs

  **Storing data**
  
  `setItem()` is used both to add new data item (when no data for given key exists), and to modify existing item (when previous data for given key exists).
  
  Storing string value
  ```js
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('my-key', value);
    } catch (e) {
      // saving error
    }
  };
  ```
  Storing object value
  ```js
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  ```
  
  **Reading data**
  
  `getItem` returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
  
  Reading string value
  ```js
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  ```
  Reading object value
  ```js
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  ```
### d Testing and extending our application

- [Linking](https://reactnative.dev/docs/linking) | React Native Docs

  ```jsx
  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return <Button title={children} onPress={handlePress} />;
  };
  ```
- [Linking](https://docs.expo.dev/guides/linking/) | Expo Docs

  ```jsx
  import * as Linking from 'expo-linking';
  
  Linking.openURL('https://expo.dev');
  ```

- [Matching Fields](https://github.com/jaredpalmer/formik/issues/90#issuecomment-354873201) | Formik GitHub Issue

  using [`oneOf`](https://github.com/jquense/yup#schemaoneofarrayofvalues-arrayany-message-string--function-schema-alias-equals) and [`ref`](https://github.com/jquense/yup#refpath-string-options--contextprefix-string--ref) methods
  ```jsx
  validationSchema: Yup.object({
    password: Yup.string().required('Password is required'),
    passwordConfirm: Yup.string()
       .oneOf([Yup.ref('password'), null])
       .required('Password confirm is required')
  })
  ```

- [Native Picker](https://github.com/react-native-picker/picker) | react-native-picker

  ```jsx
  import { useState } from 'react';
  import { Picker } from '@react-native-picker/picker';
  
  const OrderPicker = () => {
    const [order, setOrder] = useState('CREATED_AT')
    return (
      <Picker
          selectedValue={order}
          onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
      >
          <Picker.Item label="Latest repositories" value="CREATED_AT" />
          <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
          <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
      </Picker>
    )
  }
  
  export default OrderPicker
  ```

- [`@include`](https://graphql.org/learn/queries/#directives) | GraphQL Docs

  `@include(if: Boolean)` Only include this field in the result if the argument is true.

  ```gql
  query Hero($episode: Episode, $withFriends: Boolean = false) {
    hero(episode: $episode) {
      name
      friends @include(if: $withFriends) {
        name
      }
    }
  }
  ```

#### Cursor-based pagination & infinite scrolling

- [Connection Model](https://graphql.org/learn/pagination/#complete-connection-model) | GraphQL Docs

  - The ability to paginate through the list.
  - The ability to ask for information about the connection itself, like `totalCount` or `pageInfo`.
  - The ability to ask for information about the edge itself, like `cursor` or `friendshipTime`.
  - The ability to change how our backend does pagination, since the user just uses opaque cursors.


  ```gql
  {
    hero {
      name
      friendsConnection(first: 2, after: "Y3Vyc29yMQ==") {
        totalCount
        edges {
          node {
            name
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ```

- [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm) | Relay Docs

  In the query, the connection model provides a standard mechanism for slicing and paginating the result set.
  
  In the response, the connection model provides a standard way of providing cursors, and a way of telling the client when more results are available.
  
  An example of all four of those is the following query:
  ```gql
  {
    user {
      id
      name
      friends(first: 10, after: "opaqueCursor") {
        edges {
          cursor
          node {
            id
            name
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
  ```
  In this case, `friends` is a connection. That query demonstrates the four features described above:

  - Slicing is done with the `first` argument to `friends`. This asks for the connection to return 10 friends.
  - Pagination is done with the after argument to `friends`. We passed in a cursor, so we asked for the server to return friends after that cursor.
  - For each edge in the connection, we asked for a cursor. This cursor is an opaque string, and is precisely what we would pass to the `after` arg to paginate starting after this edge.
  - We asked for `hasNextPage`; that will tell us if there are more edges available, or if we’ve reached the end of this connection.

- [Pagintation with Relative Cursor](https://shopify.engineering/pagination-relative-cursors) | Shopify Engineering

  Relative cursor pagination remembers where you were so that each request after the first continues from where the previous request left off.

  The easiest way to do this is remembering the id of the last record from the last page you’ve seen and continuing from that record, but it requires the results to be sorted by id. With a last id of 67890 this would looks like:
  ```sql
  SELECT *
  FROM `products`
  WHERE `products`.`id` > 67890
  ORDER BY `products`.`id` ASC
  LIMIT 100
  ```
- [Relay-style pagination](https://www.apollographql.com/docs/react/pagination/cursor-based/#relay-style-cursor-pagination) | Apollo Docs

  ```js
  import { relayStylePagination } from "@apollo/client/utilities";

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          comments: relayStylePagination(),
        },
      },
    },
  });
  ```
- [`onEndReached` Rendering](https://stackoverflow.com/a/58681751) | StackOverFlow Answer

  wrapping the Flatlist with a View of fixed `height` and `flex:1`
  ```jsx
  import { View, Dimensions, FlatList } from 'react-native'

  const Main = () => {
    const { height } = Dimensions.get('window')
    return (
      <View style={{flex: 1, height: height}}>
        <FlatList
          data={...}
          // ...
          onEndReached={...}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
  ```

Pagination custom hook
```jsx
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
```
