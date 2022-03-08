import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";

const RepositoryInfo = ({ repository }) => {
  const styles = StyleSheet.create({
    containerInfo: {
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
  const stars = repository.stargazersCount;
  const forks = repository.forksCount;
  const reviews = repository.reviewCount;
  const ratings = repository.ratingAverage;

  return (
    <View style={styles.containerInfo}>
      <View>
        <Text testID="stargazersCount">
          {stars >= 1000 ? `${(stars / 1000).toPrecision(3)}K` : stars}
        </Text>
        <Text fontWeight="bold">Stars</Text>
      </View>
      <View>
        <Text>
          {forks >= 1000 ? `${(forks / 1000).toPrecision(3)}K` : forks}
        </Text>
        <Text fontWeight="bold">Forks</Text>
      </View>
      <View>
        <Text testID="reviewCount">
          {reviews >= 1000 ? `${(reviews / 1000).toPrecision(3)}K` : reviews}
        </Text>
        <Text fontWeight="bold">Reviews</Text>
      </View>
      <View>
        <Text testID="ratingAverage">
          {ratings >= 1000 ? `${(ratings / 1000).toPrecision(3)}K` : ratings}
        </Text>
        <Text fontWeight="bold">Ratings</Text>
      </View>
    </View>
  );
};

export default RepositoryInfo;
