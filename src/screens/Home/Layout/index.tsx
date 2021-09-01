import * as React from "react";
import * as C from "./styles";
import backgroundVector from "../../../assets/bg.png";
export default function Home() {
  return (
    <C.Container>
      <C.Background resizeMode="cover" source={backgroundVector}>
        <C.Text>Vamos começar a jogar?</C.Text>
        <C.searchGameBtn mode="contained">Procurar partida!</C.searchGameBtn>
      </C.Background>
    </C.Container>
  );
}
