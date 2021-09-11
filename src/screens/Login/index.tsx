import * as React from "react";

import Layout from "./Layout";
import ILogin from "./data";

import { useAuth } from "../../contexts/auth";

export default function Login({ props: ILogin, navigation }) {
  const { signIn } = useAuth();

  const navigateToForgotPass = () => {
    navigation.navigate("ForgotPassword");
  };
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };
  const handleSingleIn = async (email: string, password: string) => {
    signIn(email, password);
  };
  return (
    <Layout
      navigateToForgotPass={navigateToForgotPass}
      navigateToRegister={navigateToRegister}
      handleSingleIn={handleSingleIn}
    />
  );
}
