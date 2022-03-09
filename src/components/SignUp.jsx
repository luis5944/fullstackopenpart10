import { Formik } from "formik";
import React from "react";
import { Pressable, StyleSheet, View, Alert } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const SignUpForm = ({ onSubmit }) => {
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
      paddingHorizontal: 79,
    },
  });

  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Passowrd" secureTextEntry />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry
      />

      <Pressable onPress={onSubmit} style={styles.button} testID="submit">
        <Text style={styles.button} color="white">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required("Repository name is required"),
  password: yup.string().min(5).max(50).required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), "Password confirm must be equal to Password"])
    .required("Password confirm is required"),
});
const initialValues = {
  username: "luis",
  password: "password",
  passwordConfirm: "password",
};

const SignUp = () => {
  const [userCreated] = useSignUp();
  const [signIn] = useSignIn();
  let navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const { username, password } = values;
      await userCreated(values);
      await signIn({ username, password });
      navigate(`/`, { replace: true });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;
