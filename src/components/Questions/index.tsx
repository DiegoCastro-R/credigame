import React from "react";
import { View, Text } from "react-native";
interface QuestionProps {
  questionNumber: number;
  question: string;
}

const Questions = ({ questionNumber, question }: QuestionProps) => {
  // console.log('questions called. questionNumber:', questionNumber);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // marginTop: 33,
        // backgroundColor: "red",
        paddingHorizontal: 24.5,
        // paddingRight: 10,
      }}
    >
      {/* <Text
        style={{
          fontSize: 16,
          color: "#000000",
          marginRight: 10,
        }}
      >
        {questionNumber}
      </Text> */}
      <Text
        style={{
          color: "#000000",

          textAlign: "left",
          fontSize: 16,
        }}
      >
        {question}
      </Text>
    </View>
  );
};

export default Questions;
