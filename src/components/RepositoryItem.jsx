import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import RepositoryDescription from "./RepositoryDescription";
import RepositoryInfo from "./RepositoryInfo";
import Text from "./Text";
import * as Linking from "expo-linking";

const RepositoryItem = ({ repository, isFromPage }) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 15,
      backgroundColor: "white",
    },
    button: {
      marginTop: 20,
      textAlign: "center",
      backgroundColor: "#0366d6",
      borderRadius: 5,
      color: "#ffffff",
      padding: 15,
    },
  });
 

  return (
    <View style={styles.container} key={repository.id}>
      <RepositoryDescription repository={repository} />
      <RepositoryInfo repository={repository} />
      {isFromPage ? (
        <Pressable
          onPress={() => {
            Linking.openURL(repository.url);
          }}
        >
          <Text testID="language" style={styles.button}>
            Open in GitHub
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
