import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Modal,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import Questions from "../../../components/Questions";
import Answers from "../../../components/Answers";
import { getQuizQuestions, QuestionsState } from "../../../utils/utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import api from "../../utils/api";
// import { useAuth } from "../../hooks/auth";
import { useNavigation } from "@react-navigation/native";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Quiz: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [TOTAL_QUESTIONS] = useState(10);
  const [number, setNumber] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>({
    isCorrect: false,
    justification: "",
    finished: false,
  });
  // const { token, user } = useAuth();
  const navigation = useNavigation();
  const setAnswer = useRef(null);

  const startQuiz = async () => {
    // console.log('star quiz called');
    setLoading(true);
    setGameOver(false);

    const newQuestions = await (await getQuizQuestions());
    // const newQuestions = await (await getQuizQuestions())
    //   .slice(32)
    //   .sort(() => (Math.random() > 0.5 ? 1 : -1));

    // console.log('newQuestions length:', newQuestions.length, ', newQuestions:', newQuestions);
    //@ts-ignore
    setQuestions(newQuestions);

    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  useEffect(() => {
    // console.log('useEffect quiz called');
    startQuiz();
  }, []);

  const checkAnswer = () => {
    // console.log('checkAnswer quiz called');
    const answer = setAnswer.current;
    const correct = questions[number].correct_answer === answer;

    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };

    //@ts-ignore
    setUserAnswers((prev) => [...prev, answerObject]);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    showJustification(questions[number], answerObject);
  };

  const showJustification = (question: any, answer: any) => {
    // console.log('showJustification quiz called');
    setModalData({
      isCorrect: answer.correct,
      justification: question.justification,
      finished: false,
    });
    setModalVisible(true);
  };

  const showFinizQuizModal = () => {
    // console.log('showFinizQuizModal quiz called');
    setModalData({
      finished: true,
    });
    setModalVisible(true);
  };

  const finishQuiz = useCallback(async (score) => {
    // console.log("finishQuiz called");
    try {
      setModalVisible(false);
      // if (!user || !user.id) {
      //   setModalVisible(false);
      //   navigation.navigate("Home");
      // }

      // const config = {
      //   headers: { Authorization: `Bearer ${token}` },
      // };
      // const bodyParameters = {
      //   id: user.id,
      //   pontuation: score,
      // };

      // api.patch("profile/", bodyParameters, config)
      // .then(function (response) {
      //   // console.log('api return:', response);
      //   setModalVisible(false);
      //   // navigation.navigate("Home");
      // })
      // .catch(function (error) {
      //   console.log('error calling api:', error);
      //   setModalVisible(false);
      //   // navigation.navigate("Home");
      // })
    } catch (ex) {
      console.log("Could not patch user profile.", ex);
      setModalVisible(false);
      // navigation.navigate("Home");
    }
  }, []);

  const nextQuestion = () => {
    console.log("nextQuestion called");
    try {
      setModalVisible(false);
      const nextQ = number + 1;

      console.log("nextQ:", nextQ, ', TOTAL_QUESTIONS:', TOTAL_QUESTIONS);

      if (nextQ < TOTAL_QUESTIONS) {
        setModalVisible(false);
        setNumber(nextQ);
      } else {
        setGameOver(true);
        showFinizQuizModal();
      }
    } catch (ex) {
      console.log("error on nextQuestion called", ex);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        position: "relative",
        padding: 6,
        backgroundColor: "#F2F2F2",
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          {/* <Text style={{ fontSize: 16, color: "#FFF" }}>Pontos: {score}</Text> */}
          {/* <Text
            style={{
              fontSize: 16,
              color: "#EDC951",
            }}
          >
            {number + 1}/10
          </Text> */}
        </View>

        <View style={{ marginVertical: 2 }}></View>
        {questions.length > 0 ? (
          <>
            {/* <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#FFF",
                }}
              >
                Categoria:
              </Text>
            </View> */}
            <Questions
              questionNumber={number + 1}
              question={questions[number].question}
            />
            <Answers
              answers={questions[number].answers}
              {...{ setAnswer, checkAnswer }}
              //@ts-ignore
              userAnserws={userAnswers ? userAnswers[number] : undefined}
            />
          </>
        ) : null}
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: "#EDC951",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 300,
          width: 60,
          height: 60,
          position: "absolute",
          marginTop: 15,
          bottom: 20,
          right: 20,
        }}
      >
        <TouchableWithoutFeedback>
          {!gameOver && !loading && number != TOTAL_QUESTIONS - 1 ? (
            <MaterialCommunityIcons
              name="play"
              color="#fff"
              size={22}
              onPress={() => nextQuestion()}
            />
          ) : (
            <MaterialCommunityIcons
              name="arrow-right"
              color="#fff"
              size={22}
              onPress={() => nextQuestion()}
            />
          )}
        </TouchableWithoutFeedback>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          {!modalData.finished ? (
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Resposta {modalData.isCorrect ? "correta!" : "incorreta!"}
            </Text>
            <Text style={styles.modalText}>{modalData.justification}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#EDC951" }}
              onPress={nextQuestion}
            >
              <Text style={styles.textStyle}>Continuar</Text>
            </TouchableHighlight>
          </View>
        ) :
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Parabéns, você terminou o Quiz!
          </Text>
          <Text style={styles.modalText}>
            Pontuação total: {score}
          </Text>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#EDC951" }}
            onPress={() => finishQuiz(score)}
          >
            <Text style={styles.textStyle}>Terminar</Text>
          </TouchableHighlight>
        </View>
        }
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Quiz;
