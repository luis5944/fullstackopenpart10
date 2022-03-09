import { useApolloClient, useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const apolloClient = useApolloClient();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const reviewDeleted = async (id) => {
    const { data } = await deleteReview({ variables: { deleteReviewId: id } });
    apolloClient.resetStore();
    return data;
  };

  return [reviewDeleted];
};

export default useDeleteReview;
