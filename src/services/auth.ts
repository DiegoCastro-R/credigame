import api from "./api";

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export async function signIn(email: string, password): Promise<Response> {
  const data = { email, password };
  return await api.post("/users/auth", data).then((res) => {
    console.log(res.data);
    return res.data;
  });
}
