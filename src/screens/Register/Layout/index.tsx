import * as React from "react";
import * as C from "./styles";
import { IconButton } from "react-native-paper";
import Logo from "../../../assets/logo.png";
import { IRegisterLayout } from "../data";

export default function Register({ handleGoBack }: IRegisterLayout) {
  return (
    <C.Container>
      <C.Header>
        <IconButton
          icon="arrow-left"
          color="#334b99"
          size={20}
          onPress={handleGoBack}
        />
      </C.Header>
      <C.Scrollable>
        <C.Content>
          <C.Logo source={Logo}></C.Logo>
          <C.TextTitle>Cadastro</C.TextTitle>
          <C.Input label="Nome"></C.Input>
          <C.Input label="Sobrenome"></C.Input>
          <C.Input label="E-mail"></C.Input>
          <C.Input label="Senha"></C.Input>
          <C.Input label="Confirmar senha"></C.Input>
          <C.createAccountBtn mode="contained">CRIAR CONTA</C.createAccountBtn>
        </C.Content>
      </C.Scrollable>
    </C.Container>
  );
}
