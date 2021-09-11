import * as React from "react";

import { TextInput, Button } from "react-native-paper";

import * as C from "./styles";
import Logo from "../../../assets/logo.png";
import { ILoginLayout } from "../data";
export default function Login({
  navigateToForgotPass,
  navigateToRegister,
  handleSingleIn,
}: ILoginLayout) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState<boolean>(true);

  return (
    <C.Container>
      <C.Logo source={Logo}></C.Logo>
      <C.Input
        label="E-mail"
        value={email}
        mode="outlined"
        onChangeText={(email) => setEmail(email)}
      ></C.Input>
      <C.Input
        label="Senha"
        secureTextEntry={showPassword}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
        value={password}
        mode="outlined"
        onChangeText={(password) => setPassword(password)}
      ></C.Input>

      <C.ForgetPassBtn
        color="#9ca8d0"
        onPress={navigateToForgotPass}
        mode="text"
      >
        ESQUECI MINHA SENHA
      </C.ForgetPassBtn>
      <Button
        color="#334b99"
        style={{ width: 320, marginBottom: 4 }}
        mode="contained"
        onPress={() => handleSingleIn(email, password)}
      >
        ENTRAR
      </Button>
      <C.Text>ou</C.Text>
      <C.RegisterBtn onPress={navigateToRegister}>CADASTRAR-SE</C.RegisterBtn>
      {/* <Button color="#334b99">CADASTAR-SE</Button> */}
    </C.Container>
  );
}
