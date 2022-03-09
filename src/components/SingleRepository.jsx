import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import React from "react";
import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import useDeleteReview from "../hooks/useDeleteReview";

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
  button: {
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#0366d6",
    borderRadius: 5,
    color: "#ffffff",
    padding: 15,
  },
  buttonRed: {
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "red",
    borderRadius: 5,
    color: "#ffffff",
    padding: 15,
  },
});
export const ReviewItem = ({ review, fromReviews }) => {
  let navigate = useNavigate();

  const [reviewDeleted] = useDeleteReview();

  const deleteReview = async () => {
    await reviewDeleted(review.id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.review}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.info}>
        <Text fontWeight="bold">{review.repositoryId}</Text>
        <Text color="textSecondary">
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
        <Text>{review.text}</Text>
        {fromReviews ? (
          <View>
            <Pressable
              onPress={() => {
                navigate(`/${review.repositoryId}`);
              }}
            >
              <Text style={styles.button}>View Repository</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                Alert.alert(
                  "Delete Review",
                  "Are you sure you want to delete this review?",
                  [
                    {
                      text: "Cancel",
                    },
                    {
                      text: "Delete",
                      onPress: deleteReview,
                    },
                  ]
                );
              }}
            >
              <Text style={styles.buttonRed}>Delete review</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};
const ItemSeparator = () => <View style={styles.separator} />;
const SingleRepository = () => {
  const params = useParams();
  const id = params.id;

  const { loading, data, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id, first: 4 },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        variables: { id, first: 4 },
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviewsNode = data
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewsNode}
      renderItem={({ item }) => (
        <ReviewItem review={item} fromReviews={false} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={() => (
        <RepositoryItem repository={data.repository} isFromPage={true} />
      )}
    />
  );
};

export default SingleRepository;
