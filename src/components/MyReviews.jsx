import { useQuery } from "@apollo/client";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { GET_USER_LOGIN } from "../graphql/queries";
import { ReviewItem } from "./SingleRepository";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;
const MyReviews = () => {
  const { data, loading } = useQuery(GET_USER_LOGIN);
  const reviewsNode = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={reviewsNode}
      renderItem={({ item }) => <ReviewItem review={item} fromReviews={true}/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    ></FlatList>
  );
};

export default MyReviews;
