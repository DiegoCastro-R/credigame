import * as React from "react";
import * as C from "./styles";
import { IconButton } from "react-native-paper";
import { TextInput } from "react-native-paper";
import Logo from "../../../assets/logo.png";
import { IRegisterLayout } from "../data";

export default function Register({
  handleGoBack,
  checkRegisterIsValid,
}: IRegisterLayout) {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkPassword, setCheckPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState<boolean>(true);
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
          <C.Input
            label="Nome"
            onChangeText={(name) => setName(name)}
          ></C.Input>
          <C.Input
            label="Sobrenome"
            onChangeText={(lastName) => setLastName(lastName)}
          ></C.Input>
          <C.Input
            label="E-mail"
            onChangeText={(email) => setEmail(email)}
          ></C.Input>
          <C.Input
            label="Senha"
            secureTextEntry={showPassword}
            onChangeText={(password) => setPassword(password)}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              />
            }
          ></C.Input>
          <C.Input
            secureTextEntry={showPassword}
            label="Confirmar senha"
            onChangeText={(checkPassword) => setCheckPassword(checkPassword)}
          ></C.Input>
          <C.createAccountBtn
            mode="contained"
            onPress={() => {
              checkRegisterIsValid(
                name,
                lastName,
                email,
                password,
                checkPassword
              );
            }}
          >
            CRIAR CONTA
          </C.createAccountBtn>
        </C.Content>
      </C.Scrollable>
    </C.Container>
  );
}
