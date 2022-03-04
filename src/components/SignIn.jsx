import { Formik } from "formik";
import { View } from "react-native";

import * as yup from "yup";
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
  username: "",
  password: "",
};
const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
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
};

export default SignIn;
