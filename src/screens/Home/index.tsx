import * as React from "react";
import Layout from "./Layout";

export default function Home({ props: ILogin, navigation }) {
  const navigateToQuiz = () => {
    navigation.navigate("Quiz");
  };

  return (
    <Layout
      navigateToQuiz={navigateToQuiz}
    />
  );
}
