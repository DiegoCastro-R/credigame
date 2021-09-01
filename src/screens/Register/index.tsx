import * as React from "react";
import Layout from "./Layout";

import IRegister from "./data";

export default function Register({ props: IRegister, navigation }) {
  const handleGoBack = () => navigation.goBack();
  return <Layout handleGoBack={handleGoBack} />;
}
