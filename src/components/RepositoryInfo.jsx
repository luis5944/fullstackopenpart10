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
  const stars = repository.item.stargazersCount;
  const forks = repository.item.forksCount;
  const reviews = repository.item.reviewCount;
  const ratings = repository.item.ratingAverage;

  return (
    <View style={styles.containerInfo}>
      <View>
        <Text>
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
        <Text>
          {reviews >= 1000 ? `${(reviews / 1000).toPrecision(3)}K` : reviews}
        </Text>
        <Text fontWeight="bold">Reviews</Text>
      </View>
      <View>
        <Text>
          {ratings >= 1000 ? `${(ratings / 1000).toPrecision(3)}K` : ratings}
        </Text>
        <Text fontWeight="bold">Ratings</Text>
      </View>
    </View>
  );
};

export default RepositoryInfo;
