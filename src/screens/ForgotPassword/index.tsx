import * as React from "react";
import IForgotPassword from "./data";
import Layout from "./Layout";

export default function ForgotPassword({ props: IForgotPassword, navigation }) {
  const handleGoBack = () => navigation.goBack();
  return <Layout handleGoBack={handleGoBack} />;
}
