import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    marginTop: 10,
    backgroundColor: "#ffff",
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  info: {
    paddingHorizontal: 20,
  },
  review: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "#0366d6",
    borderRadius: 30 / 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  
  },
});
const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.review}>
        <Text color="primary" fontWeight="bold">{review.rating}</Text>
      </View>
      <View style={styles.info}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};
const ItemSeparator = () => <View style={styles.separator} />;
const SingleRepository = () => {
  const params = useParams();
  const id = params.id;

  const { loading, data } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });
  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviewsNode = data
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewsNode}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem repository={data.repository} isFromPage={true} />
      )}
    />
  );
};

export default SingleRepository;
