import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ children, link }) => {
  const styles = StyleSheet.create({
    text: {
      marginLeft: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#ffff",
    },
  });
  return (
    <Pressable>
      <Link to={link} style={styles.text}>
        <Text fontSize="subheading">{children}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
