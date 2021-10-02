import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { TMDB_API_KEY, TMDB_API_URI } from "@env";
import { TabIcon, Loader } from "../components";

const Search = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${TMDB_API_URI}/search/multi?api_key=${TMDB_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchQuery}`
    );

    const jsonData = await response.json();
    setData(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMovies = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("MovieDetail", { selectedMovie: item })
        }
      >
        <View
          style={{
            marginLeft: index % 3 !== 0 ? SIZES.padding / 2 : 0,
            marginBottom: SIZES.padding,
            position: "relative",
          }}
        >
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w500/" + item.poster_path,
            }}
            resizeMode="cover"
            style={{
              width: SIZES.width / 3.5,
              height: SIZES.width / 3.5 + 60,
              borderRadius: 20,
            }}
          />
          {item.vote_average === 0 ? null : (
            <View
              style={{
                backgroundColor:
                  item.vote_average > 7 ? COLORS.blue : COLORS.primary,
                width: 25,
                height: 25,
                position: "absolute",
                borderRadius: 50,
                right: 0,
                top: 0,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  textAlign: "center",
                  ...FONTS.body5,
                }}
              >
                {item.vote_average}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.black,
        flex: 1,
      }}
    >
      <View
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={searchQuery}
          onChangeText={(queryText) => setSearchQuery(queryText)}
          placeholder="Search"
          style={{
            borderRadius: 20,
            backgroundColor: COLORS.white,
            flex: 1,
            padding: 8,
            paddingLeft: 16,
            marginRight: 10,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            borderRadius: 20,
          }}
          onPress={fetchData}
        >
          <TabIcon icon={icons.search_icon} />
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
      {data && (
        <View
          style={{
            backgroundColor: COLORS.black,
            width: SIZES.width,
            height: SIZES.height,
            flex: 1,
            marginTop: 10,
          }}
        >
          <FlatList
            data={data}
            renderItem={renderMovies}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              marginLeft: SIZES.padding / 2,
              paddingBottom: SIZES.padding,
            }}
            columnWrapperStyle={{
              flexWrap: "wrap",
              flex: 1,
              flexDirection: "row",
            }}
            numColumns={18}
          />
        </View>
      )}
    </View>
  );
};

export default Search;
