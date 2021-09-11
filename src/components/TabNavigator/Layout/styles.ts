import styled from "styled-components/native";
import { IconButton } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text``;

export const Button = styled(IconButton);

export const logoutBtn = styled(Button)`
  color: #334b99;
  text-align: center;
  width: 220px;
`;
