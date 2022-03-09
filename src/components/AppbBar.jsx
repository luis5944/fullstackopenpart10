import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from "../graphql/queries";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    alignItems: "flex-end",
    height: 100,
    padding: 20,
  },
  scroll: {
    flexDirection: "row",
    minWidth: "100%",
    justifyContent: "space-evenly",
  },
});

const AppBar = () => {
  const { loading, data } = useQuery(GET_USER_LOGIN);
  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab link="/">Repositories</AppBarTab>
        {data.me === null ? (
          <>
            <AppBarTab link="/signin">Sign in</AppBarTab>
            <AppBarTab link="/signup">Sign up</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab link="/review">Create a review</AppBarTab>
            <AppBarTab>Sign out</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
