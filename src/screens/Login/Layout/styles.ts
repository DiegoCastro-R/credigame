import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Logo = styled.Image`
  width: 105px;
  height: 84px;
  margin-bottom: 30px;
`;

export const Input = styled(TextInput)`
  width: 320px;
  margin: 15px;
`;

export const ForgetPassBtn = styled(Button)`
  color: #9ca8d0;
  opacity: 0.5;
  margin-bottom: 80px;
`;

export const LoginBtn = styled(Button)`
  color: #334b99;
  width: 320px;
  margin-bottom: 4px;
`;

export const Text = styled.Text`
  margin-bottom: 4px;
`;

export const RegisterBtn = styled(Button)`
  color: #334b99;
`;
