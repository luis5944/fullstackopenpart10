import { StyleSheet, View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import AppBar from "./AppbBar";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import SignIn from "./SignIn";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/review" element={<CreateReview />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/myreviews" element={<MyReviews />} exact />
      </Routes>
    </View>
  );
};

export default Main;
