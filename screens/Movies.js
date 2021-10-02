import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { TMDB_API_URI, TMDB_API_KEY } from "@env";
import { COLORS, SIZES, FONTS } from "../constants";

const Movies = ({ navigation, route }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  let { selectedGenres, genres } = route.params;

  const genresToIds = (selected) => {
    if (selected.length < 1) {
      return "";
    }
    const data = genres.filter((el) => {
      return selected.includes(el.name);
    });

    const genresIds = data.map((el) => el.id);
    return genresIds.reduce((acc, curr) => acc + ", " + curr);
  };

  const genresToURL = genresToIds(selectedGenres);

  const fetchMovies = async () => {
    const res = await fetch(
      `${TMDB_API_URI}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresToURL}`
    );

    const json = await res.json();
    setMovies(movies.concat(json.results));
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genresToURL]);

  const renderMovies = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("MovieDetail", {
            selectedMovie: item,
            media_type: "movie",
          })
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

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const renderLoader = () => {
    return (
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <ActivityIndicator color={COLORS.white} size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View
        style={{
          backgroundColor: COLORS.black,
          width: SIZES.width,
          height: SIZES.height,
          flex: 1,
        }}
      >
        <FlatList
          data={movies}
          renderItem={renderMovies}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            marginLeft: SIZES.padding / 2,
            paddingBottom: SIZES.padding,
          }}
          columnWrapperStyle={{
            flexWrap: "wrap",
            flex: 1,
            flexDirection: "row",
          }}
          numColumns={18}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderLoader}
        />
      </View>
    </SafeAreaView>
  );
};

export default Movies;
