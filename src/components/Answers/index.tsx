import React, { Fragment } from "react";
import { View, Text, Keyboard } from "react-native";
import StyledButton from "../Button";
import { AnswerObject } from "../../screens/Quiz/data";
interface AnswersProps {
  answers: string[];
  setAnswer: any;
  checkAnswer: () => void;
  userAnserw: AnswerObject | undefined;
}

export default function Answers({
  answers,
  setAnswer,
  checkAnswer,
  userAnserw,
}: AnswersProps) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 14,
        paddingHorizontal: 24.5,
        marginTop: 30,
      }}
    >
      {answers.map((answer, key) => (
        <Fragment key={answer}>
          <StyledButton
            {...{ key, answer }}
            correct={userAnserw?.correctAnswer === answer}
            disabled={userAnserw ? true : false}
            onPress={() => {
              setAnswer.current = answer;
              checkAnswer();
            }}
          ></StyledButton>
        </Fragment>
      ))}
    </View>
  );
}
