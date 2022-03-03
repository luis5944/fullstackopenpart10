import React from "react";
import { StyleSheet, View } from "react-native";
import RepositoryDescription from "./RepositoryDescription";
import RepositoryInfo from "./RepositoryInfo";

const RepositoryItem = ({ repository }) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 15,
      backgroundColor: "white",
    },
  });

  return (
    <View style={styles.container} key={repository.item.id}>
      <RepositoryDescription repository={repository} />
      <RepositoryInfo repository={repository} />
    </View>
  );
};

export default RepositoryItem;
