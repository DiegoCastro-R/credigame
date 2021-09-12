import * as React from "react";

import * as screens from "../../../screens";
import * as C from "./styles";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeView({ navigation }) {
  return (
    <C.Container>
      <C.Button
        icon="house-variant"
        onPress={() => navigation.navigate("Home")}
      />
      <C.Text>Inicio</C.Text>
    </C.Container>
  );
}

function RankingView({ navigation }) {
  return (
    <C.Container>
      {/* <C.Button icon="home" onPress={() => navigation.navigate("Home")} /> */}
      <C.Text>Ranking</C.Text>
    </C.Container>
  );
}

function ProfileView({ navigation }) {
  return (
    <C.Container>
      <C.Text>Perfil</C.Text>
    </C.Container>
  );
}

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons name="home" size={23} color="#3953A2" />
            );
          },
          headerTitleStyle: { color: "#FFF" },
          headerStyle: { backgroundColor: "#3953A2" },
          headerShown: true,
        }}
        component={screens.HomeView}
      ></Tab.Screen>
      <Tab.Screen
        name="Ranking"
        options={{
          title: "Ranking",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons name="podium" size={23} color="#3953A2" />
            );
          },
          headerTitleStyle: { color: "#FFF" },
          headerStyle: { backgroundColor: "#3953A2" },
          headerShown: true,
        }}
        component={screens.Ranking}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account"
                size={23}
                color="#3953A2"
              />
            );
          },
          headerTitleStyle: { color: "#FFF" },
          headerStyle: { backgroundColor: "#3953A2" },
          headerShown: true,
        }}
        component={screens.ProfileView}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
