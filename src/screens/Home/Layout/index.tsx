import * as React from "react";
import * as C from "./styles";
import backgroundVector from "../../../assets/bg.png";
import { IHomeLayout } from "../data";

export default function Home({
  navigateToQuiz
}: IHomeLayout) {
  return (
    <C.Container>
      <C.Background resizeMode="cover" source={backgroundVector}>
        <C.Text>Vamos começar a jogar?</C.Text>
        <C.searchGameBtn
          mode="contained"
          onPress={navigateToQuiz}
        >Procurar partida!</C.searchGameBtn>
      </C.Background>
    </C.Container>
  );
}
