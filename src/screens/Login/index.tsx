import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Layout from "./Layout";
import ILogin from "./data";
export default function Login({ props: ILogin, navigation }) {
  const navigateToForgotPass = () => {
    navigation.navigate("ForgotPassword");
  };
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <Layout
      navigateToForgotPass={navigateToForgotPass}
      navigateToRegister={navigateToRegister}
    />
  );
}
