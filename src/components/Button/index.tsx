import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { elevate } from "react-native-elevate";
const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    height: 'auto',
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 14,
    paddingHorizontal: 13,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    textAlign: "left",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#000",
  },
});

interface ButtonProps {
  key: number;
  answer: string;
  onPress: () => void;
  correct: boolean;
  disabled: boolean;
}

const StyledButton = ({ answer, onPress, correct, disabled }: ButtonProps) => {
  return (
    <RectButton
      {...{ onPress }}
      style={[
        styles.container,
        elevate(5),
        { backgroundColor: !disabled ? "#fff" : "#ccc" },
      ]}
    >
      <Text
        style={{
          ...styles.label,
          color: correct ? "#013220" : "#3e3e3e",
        }}
      >
        {answer}
      </Text>
    </RectButton>
  );
};
export default StyledButton;
