import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Header = styled.View`
  background-color: white;
  justify-content: flex-start;
  padding: 20px;
  width: 150px;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Logo = styled.Image`
  width: 105px;
  height: 84px;
  margin-bottom: 80px;
`;

export const Input = styled(TextInput)`
  width: 320px;
  margin: 15px;
`;

export const sendMailBtn = styled(Button)`
  color: #334b99;
  width: 320px;
  margin-top: 40px;
  margin-bottom: 4px;
`;

export const TextTitle = styled.Text`
  margin-bottom: 4px;
  font-size: 24px;
  color: #3953a2;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
export const Text = styled.Text`
  margin-bottom: 4px;
  align-items: center;
  text-align: left;
  font-size: 16px;
  padding: 12px;
`;
