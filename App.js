import React, { useState, useEffect } from "react";
import { MovieDetail, Movies } from "./screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";

import Tabs from "./navigation/tabs";
import { COLORS } from "./constants";
import Loader from "./components/Loader";
import Tv from "./screens/Tv";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    getFonts();
  }, []);

  if (fontLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Home"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
          <Stack.Screen name="MovieGenres" component={Movies} />
          <Stack.Screen name="TvGenres" component={Tv} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <Loader />;
  }
};

export default App;
