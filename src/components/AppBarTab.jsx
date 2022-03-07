import { useApolloClient } from "@apollo/client";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import Text from "./Text";

const AppBarTab = ({ children, link }) => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const styles = StyleSheet.create({
    text: {
      marginLeft: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#ffff",
    },
  });

  if (!link) {
    return (
      <Pressable
        onPress={async () => {
          await authStorage.removeAccessToken();
          apolloClient.resetStore();
        }}
      >
        <Text fontSize="subheading" style={styles.text}>
          {children}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable>
      <Link to={link} style={styles.text}>
        <Text fontSize="subheading">{children}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
