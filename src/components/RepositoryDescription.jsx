import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";


const RepositoryDescription = ({ repository }) => {
  const styles = StyleSheet.create({
    logo: {
      width: 45,
      height: 45,
      borderRadius: 5,
    },

    logoContainer: {
      flexGrow: 0,
      paddingRight: 15,
    },
    containerDescription: {
      flexDirection: "row",
      maxWidth: 300,
    },
    description: {
      paddingBottom: 5,
    },

    language: {
      backgroundColor: "#0366d6",
      borderRadius: 5,
      color: "#ffffff",
      alignSelf: "flex-start",
      padding: 5,
    },
  });
  return (
    <View testID="repositoryItem" style={styles.containerDescription}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{ uri: repository.ownerAvatarUrl }}
        />
      </View>

      <View>
        <Text style={styles.description} fontWeight="bold" testID="fullName">
          {repository.fullName}
        </Text>
        <Text
          color="textSecondary"
          style={styles.description}
          testID="description"
        >
          {repository.description}
        </Text>
        <Text  testID="language" style={styles.language}>{repository.language}</Text>
      </View>
    </View>
  );
};

export default RepositoryDescription;
