import * as React from "react";

import { IconButton, TextInput } from "react-native-paper";

import * as C from "./styles";
import Logo from "../../../assets/logo.png";

import { IForgotPasswordLayout } from "../data";

export default function ForgortPassword({
  handleGoBack,
}: IForgotPasswordLayout) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState<boolean>(true);

  return (
    <React.Fragment>
      <C.Container>
        <C.Header>
          <IconButton
            icon="arrow-left"
            color="#334b99"
            size={20}
            onPress={handleGoBack}
          />
        </C.Header>
        <C.Content>
          <C.Logo source={Logo}></C.Logo>
          <C.TextTitle>Esqueci minha senha</C.TextTitle>
          <C.Text>
            Para recuperar sua senha informe seu e-mail de cadastro que
            enviaremos um link para alteração de senha.
          </C.Text>
          <C.Input
            label="E-mail de Cadastro"
            right={<TextInput.Icon name="email" accessible={false} />}
            value={email}
            mode="outlined"
            onChangeText={(email) => setPassword(email)}
          ></C.Input>
          <C.sendMailBtn mode="contained">
            ENVIAR E-MAIL DE RECUPERAÇÃO
          </C.sendMailBtn>
        </C.Content>
      </C.Container>
    </React.Fragment>
  );
}
