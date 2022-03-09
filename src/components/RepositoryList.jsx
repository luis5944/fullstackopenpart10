import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Link } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
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
            <RepositoryItem repository={item.item} isFromPage={false} />
          </Link>
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const { data, loading, error } = useRepositories({ sort, search: value });
  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <>
      <Searchbar
        placeholder="Search"
        value={search}
        onChangeText={(query) => setSearch(query)}
      />
      <Picker
        selectedValue={sort}
        onValueChange={(itemValue) => setSort(itemValue)}
        prompt="Select an item"
      >
        <Picker.Item label="Latest repositories" value="Latest repositories" />
        <Picker.Item
          label="Highest rated repositories"
          value="Highest rated repositories"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="Lowest rated repositories"
        />
      </Picker>

      <RepositoryListContainer data={data} />
    </>
  );
};

export default RepositoryList;
