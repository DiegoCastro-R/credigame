import * as React from "react";
import { useContext } from "react";
import { useAuth } from "../../../contexts/auth";
import * as C from "./styles";
import backgroundVector from "../../../assets/bg.png";
export default function Profile() {
  const { user, signOut } = useAuth();
  console.log(user);
  return (
    <C.Container>
      <C.Background resizeMode="cover" source={backgroundVector}>
        <C.ProfileAvatar
          source={{
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJlkQw-QQbXZ_B2H8FiN42DpiOzNqDi4Rrw&usqp=CAU",
          }}
        ></C.ProfileAvatar>

        <C.Text>Olá, {user}</C.Text>
        <C.logoutBtn onPress={signOut} mode="contained">
          logout
        </C.logoutBtn>
      </C.Background>
    </C.Container>
  );
}
