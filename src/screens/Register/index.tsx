import * as React from "react";

import Toast from "react-native-toast-message";

import Layout from "./Layout";
import api from "../../services/api";

export default function Register({ props: IRegister, navigation }) {
  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };
  const handleRegister = async (dataForRequest) => {
    await api.post("/users/register", dataForRequest).then((res) => {
      const data = res.data;
      if (data.success) {
        Toast.show({
          type: "success",
          text1: "Cadastro realizado com sucesso!",
        });
        navigation.goBack();
      }
      if (data.message === "Email Already in use") {
        Toast.show({ type: "error", text1: "E-mail já cadastrado" });
      } else {
        Toast.show({
          type: "error",
          text1:
            "Error ao realizar o cadastro,por favor, tente novamente mais tarde.",
        });
      }
    });
  };
  const handleGoBack = () => navigation.goBack();
  const checkRegisterIsValid = (
    name: string,
    lastName: string,
    email: string,
    password: string,
    checkPassword: string
  ) => {
    const dataForRequest = { name, lastName, email, password };
    if (!name || !lastName || !email || !password || !checkPassword) {
      Toast.show({
        type: "info",
        text1: "Preencha todos os campos para realizar o cadastro",
      });

      return false;
    }
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      Toast.show({
        type: "info",
        text1: "Insira um e-mail valido para realizar o cadastro",
      });
      return false;
    }
    if (password !== checkPassword) {
      Toast.show({
        type: "info",
        text1: "As senhas informadas, não coicidem",
      });
    }
    console.log("should handle the api request");
    handleRegister(dataForRequest);
  };

  return (
    <Layout
      handleGoBack={handleGoBack}
      checkRegisterIsValid={checkRegisterIsValid}
    />
  );
}
