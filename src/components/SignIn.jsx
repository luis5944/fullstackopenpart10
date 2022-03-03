import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const initialValues = {
  username: "",
  password: "",
};
const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

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
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.button} color="white">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
