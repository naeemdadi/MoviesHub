import React, { useEffect, useState } from "react";
import { TMDB_API_KEY, TMDB_API_URI } from "@env";
import { View, Text, Pressable } from "react-native";
import SelectableChips from "react-native-chip/SelectableChips";
import { COLORS, FONTS, SIZES } from "../constants";

const GenresMovies = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchGenres = async () => {
    const data = await fetch(
      `${TMDB_API_URI}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const json = await data.json();
    setGenres(json.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
  }, []);

  return (
    <View
      style={{
        backgroundColor: COLORS.black,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <SelectableChips
        initialChips={genres?.map((gen) => gen.name)}
        onChangeChips={(chips) => setSelectedGenres(chips)}
      />
      <View style={{ marginTop: SIZES.padding }}>
        <Pressable
          style={{
            backgroundColor: COLORS.blue,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            borderRadius: 4,
          }}
          onPress={() =>
            navigation.navigate("MovieGenres", {
              selectedGenres: selectedGenres,
              genres: genres,
            })
          }
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body3,
              textTransform: "uppercase",
            }}
          >
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GenresMovies;
