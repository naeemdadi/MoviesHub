import React from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../constants";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.black,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.white} />
    </View>
  );
};

export default Loader;
