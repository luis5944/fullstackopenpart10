import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const LoginForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "stretch",
    },
    button: {
      backgroundColor: "#0366d6",
      borderRadius: 5,
      color: "#ffffff",
      paddingVertical: 5,
      alignSelf: "center",
      paddingHorizontal: 80,
    },
  });

  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        testID="username"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        testID="password"
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={styles.button} testID="submit">
        <Text style={styles.button} color="white">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;
