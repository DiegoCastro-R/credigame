import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import * as screens from "../screens";
import { TabNavigator } from "../components";
const Stack = createStackNavigator();

const LoginNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      options={{
        headerStyle: { backgroundColor: "#3953A2" },
        headerShown: false,
      }}
      name="Login"
      component={screens.LoginView}
    ></Stack.Screen>
    <Stack.Screen
      options={{
        headerStyle: { backgroundColor: "#3953A2" },
        headerShown: false,
      }}
      name="Register"
      component={screens.RegisterView}
    ></Stack.Screen>
    <Stack.Screen
      options={{
        headerStyle: { backgroundColor: "#3953A2" },
        headerShown: false,
      }}
      name="ForgotPassword"
      component={screens.ForgotPassView}
    ></Stack.Screen>
  </Stack.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="bottomTab"
      component={TabNavigator}
    ></Stack.Screen>
    <Stack.Screen
      options={{
        title: "Inicio",
        headerTitleStyle: { color: "#FFF" },
        headerStyle: { backgroundColor: "#3953A2" },
        headerShown: true,
      }}
      name="Home"
      component={screens.HomeView}
    ></Stack.Screen>
  </Stack.Navigator>
);

export default function Routes() {
  return <AuthNavigator />;
}
