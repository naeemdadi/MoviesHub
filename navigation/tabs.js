import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens";
import { COLORS, icons, FONTS } from "../constants";

import { Search } from "../screens";
import { GenresMovies, GenresTv, TabIcon } from "../components";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: COLORS.black },
        headerTintColor: COLORS.white,
        headerTitleStyle: { ...FONTS.h2 },
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Trending"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.trending} />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={GenresMovies}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.movie} />
          ),
        }}
      />
      <Tab.Screen
        name="Tv Series"
        component={GenresTv}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tv_shows} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search_icon} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
