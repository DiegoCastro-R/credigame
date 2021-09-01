import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const Background = styled.ImageBackground`
  width: ${Width}px;
  height: ${Height}px;
  align-items: center;
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

export const Text = styled.Text`
  color: #3953a2;
  font-size: 48px;
  margin-bottom: 4px;
  text-align: center;
  padding: 20px;
  margin-top: 80px;
`;

export const searchGameBtn = styled(Button)`
  color: #334b99;
  text-align: center;
  width: 220px;
`;
