import { Formik } from "formik";
import { Alert, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import LoginForm from "./LoginForm";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be greater or equal to 5")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be greater or equal to 6")
    .required("Password is required"),
});
const initialValues = {
  username: "Kalle",
  password: "password",
};

const SignIn = () => {
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { username, password } = values;
      await signIn({ username, password });
      navigate("/", { replace: true });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return <SignInContainer onSubmit={onSubmit} />;
};

export function SignInContainer({ onSubmit }) {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
}

export default SignIn;
