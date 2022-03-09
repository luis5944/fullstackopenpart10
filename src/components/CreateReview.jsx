import { Formik } from "formik";
import React from "react";
import { Pressable, StyleSheet, View, Alert } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import useReview from "../hooks/useReview";
import { useNavigate } from "react-router-native";

const ReviewForm = ({ onSubmit }) => {
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
      paddingHorizontal: 66,
    },
  });

  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" multiline />

      <Pressable onPress={onSubmit} style={styles.button} testID="submit">
        <Text style={styles.button} color="white">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository name is required"),

  repositoryName: yup.string().required("Repository owner's name is required"),

  rating: yup
    .number()
    .min(0, "Rating must be greater than 0")
    .max(100, "Rating must be less than 100")
    .required("Rating is required"),
  review: yup.string(),
});
const initialValues = {
  repositoryName: "react-async",
  ownerName: "async-library",
  rating: "100",
  review: "hello",
};

export function CreateReview() {
  const [reviewCreated] = useReview();
  let navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const {createReview} = await reviewCreated(values);
      navigate(`/${createReview.repositoryId}`, { replace: true });
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
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
}

export default CreateReview;
