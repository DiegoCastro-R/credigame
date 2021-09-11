import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import Routes from "./src/routes/Routes";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/auth";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
