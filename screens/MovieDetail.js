import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
  Linking,
} from "react-native";
import { TMDB_API_KEY, TMDB_API_URI } from "@env";

import { COLORS, SIZES, FONTS, icons } from "../constants";

const MovieDetail = ({ navigation, route }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [content, setContent] = useState();
  const [credits, setCredits] = useState();
  const [media_type, setMediaType] = useState("");
  const [videos, setVideos] = useState();

  useEffect(() => {
    let { selectedMovie, media_type } = route.params;
    setSelectedMovie(selectedMovie);
    setMediaType(media_type);

    const fetchData = async () => {
      const data = await fetch(
        `${TMDB_API_URI}/${
          !media_type ? selectedMovie?.media_type : media_type
        }/${selectedMovie?.id}?api_key=${TMDB_API_KEY}&language=en-US`
      );

      const jsonData = await data.json();

      setContent(jsonData);
    };

    const fetchCredits = async () => {
      const credit = await fetch(
        `${TMDB_API_URI}/${
          !media_type ? selectedMovie?.media_type : media_type
        }/${selectedMovie?.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
      );

      const crditsJson = await credit.json();

      setCredits(crditsJson);
    };

    const fetchVideo = async () => {
      const video = await fetch(
        `${TMDB_API_URI}/${
          !media_type ? selectedMovie?.media_type : media_type
        }/${selectedMovie?.id}/videos?api_key=${TMDB_API_KEY}&language=en-US `
      );

      const videosJson = await video.json();

      setVideos(videosJson.results[0].key);
    };

    fetchData();
    fetchCredits();
    fetchVideo();
  }, []);

  const renderPosterSection = () => {
    return (
      <Image
        source={{
          uri:
            "https://image.tmdb.org/t/p/original/" +
            selectedMovie?.backdrop_path,
        }}
        style={{
          width: SIZES.width,
          height: SIZES.height < 700 ? SIZES.height * 0.5 : SIZES.height * 0.6,
        }}
        resizeMode="cover"
      />
    );
  };

  const renderCast = (item, index) => {
    return (
      <View
        style={{
          marginLeft: index === 0 ? 0 : 20,
          marginBottom: SIZES.padding,
          position: "relative",
          width: SIZES.width / 3,
        }}
        key={item.id}
      >
        <Image
          source={{
            uri: "https://image.tmdb.org/t/p/w500/" + item.profile_path,
          }}
          resizeMode="cover"
          style={{
            width: SIZES.width / 3,
            height: SIZES.width / 3 + 60,
            borderRadius: 20,
          }}
        />
        <Text style={{ color: COLORS.white, ...FONTS.h3, paddingTop: 5 }}>
          {item.name}
        </Text>
        <Text style={{ color: COLORS.lightGray, ...FONTS.body5 }}>
          {item.character}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: COLORS.black,
        // flex: 1,
        flexGrow: 1,
        position: "relative",
      }}
    >
      {renderPosterSection()}
      <ScrollView>
        {selectedMovie && content && (
          <View>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
                textTransform: "uppercase",
                textAlign: "center",
                paddingTop: 10,
              }}
            >
              {selectedMovie.name || selectedMovie.title} (
              {selectedMovie.media_type === "tv" || media_type === "tv"
                ? selectedMovie?.first_air_date.substring(0, 4)
                : selectedMovie?.release_date.substring(0, 4)}
              )
            </Text>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={[styles.containerStyles, { marginLeft: 0 }]}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body4,
                    textAlign: "center",
                  }}
                >
                  {content?.genres.map((i) => i.name).join("/")}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View style={styles.containerStyles}>
                <Image
                  source={icons.star}
                  resizeMode="contain"
                  style={{ width: 15, height: 15 }}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h4,
                    marginLeft: SIZES.base,
                  }}
                >
                  {content.vote_average}
                </Text>
              </View>
              <View style={styles.containerStyles}>
                <Text style={{ color: COLORS.white }}>
                  {media_type
                    ? media_type.toUpperCase()
                    : selectedMovie?.media_type.toUpperCase()}
                </Text>
              </View>
              {content.seasons && (
                <View style={styles.containerStyles}>
                  <Text style={{ color: COLORS.white }}>
                    {content.seasons[content.seasons.length - 1].name}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{ color: COLORS.lightGray, ...FONTS.body4, padding: 10 }}
            >
              {content?.overview}
            </Text>
            {credits && (
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Cast</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ marginTop: SIZES.padding }}
                  data={credits.cast}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => renderCast(item, index)}
                />
              </View>
            )}
          </View>
        )}
        {videos && (
          <TouchableOpacity
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 0,
              borderRadius: 15,
              backgroundColor: COLORS.primary,
              marginHorizontal: SIZES.base,
              marginBottom: SIZES.padding,
            }}
            onPress={() =>
              Linking.openURL(`https://www.youtube.com/watch?v=${videos}`)
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.play_button}
                style={{
                  tintColor: COLORS.white,
                  width: 30,
                  height: 30,
                  marginRight: SIZES.base,
                }}
              />
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                Watch Trailer
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyles: { color: COLORS.white },
  containerStyles: {
    backgroundColor: COLORS.gray1,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    marginTop: SIZES.base,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.base,
    marginLeft: SIZES.base,
  },
});

export default MovieDetail;
