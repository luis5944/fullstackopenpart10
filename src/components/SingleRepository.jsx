import { useQuery } from "@apollo/client";
import { View } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import React from "react";

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

  console.log(reviewsNode[0].text);
  return (
    <View>
      <RepositoryItem repository={data.repository} isFromPage={true} />
    </View>
  );
};

export default SingleRepository;
