import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ data }) => {
  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(item) => (
        <Pressable>
          <Link to={`/${item.item.id}`}>
            <RepositoryItem repository={item.item} isFromPage={false}/>
          </Link>
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();

  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>Error fetching data</Text>;
  }

  return <RepositoryListContainer data={data} />;
};

export default RepositoryList;
