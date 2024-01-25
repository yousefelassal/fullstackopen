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
