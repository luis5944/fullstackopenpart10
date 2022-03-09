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
import React from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ data, onEndReach }) => {
  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
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
  const [value] = useDebounce(search, 1500);
  const { data, loading, error, fetchMore } = useRepositories({
    sort,
    search: value,
    first: 6,
  });
  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>Error fetching data</Text>;
  }

  const onEndReach = () => {
    fetchMore();
  };

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

      <RepositoryListContainer data={data} onEndReach={onEndReach} />
    </>
  );
};

export default RepositoryList;
