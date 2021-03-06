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
import { useAuth } from "../../../contexts/auth";
import { getQuizQuestions, QuestionsState } from "../../../utils/utils";
import api from "../../../services/api";
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
    // justification: "",
    finished: false,
  });
  const navigation = useNavigation();
  const setAnswer = useRef(null);
  const { user } = useAuth();

  const startQuiz = async () => {
    console.log('start quiz called. user:', user?.name);
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
    console.log('useEffect quiz called');
    startQuiz();
  }, []);

  const checkAnswer = () => {
    console.log('checkAnswer quiz called');
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
    console.log('showJustification quiz called');
    setModalData({
      isCorrect: answer.correct,
      // justification: question.justification,
      finished: false,
    });
    setModalVisible(true);
  };

  const showFinizQuizModal = () => {
    console.log('showFinizQuizModal quiz called');
    setModalData({
      finished: true,
    });
    setModalVisible(true);
  };

  const sendScore = async () => {
    console.log('sendScore called! score:', score);

    const bodyParameters = {
      score: score
    };

    try {
      api.post("/users/update-score", bodyParameters).then((res) => {
        const data = res.data;
        console.log('resposta score update:', data);
        if (data.success) {
          console.log('pontua????o enviada com sucesso');
        }
      });
    } catch(ex) {
      console.log('erro postando score:', ex);
    }
  };

  const finishQuiz = useCallback(async (score) => {
    console.log("finishQuiz called");
    try {
      setModalVisible(false);
      navigation.navigate({name: "Home"} as any);

      // if (!user || !user.id) {
      //   setModalVisible(false);
      //   navigation.navigate("Home");
      // }

      // const config = {
      //   headers: { Authorization: `Bearer ${token}` },
      // };
      // const bodyParameters = {
      //   score: score
      // };

      // api.post("/update-score", bodyParameters).then((res) => {
      //   const data = res.data;
      //   console.log('resposta score update:', data);
      //   if (data.success) {
      //     console.log('pontua????o enviada com sucesso');
      //     // Toast.show({
      //     //   type: "success",
      //     //   text1: "Cadastro realizado com sucesso!",
      //     // });
      //     // navigation.goBack();
      //   }
      // });
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
        sendScore();
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
      {gameOver &&
        <View>
          <View>
            <Text>
              Parab??ns {user?.name}!
            </Text>
            <Text>
              Seu total de pontos era de: {0}
            </Text>
          </View>
        </View>
      }

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          {/* <Text style={{ fontSize: 16, color: "#FFF" }}>Pontos: {score}</Text> */}
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 24.5,
              color: "#000000",
            }}
          >
            {number + 1}/{TOTAL_QUESTIONS}
          </Text>
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
      <Text
        style={{
          // width: "100%",
          alignSelf: "center",
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: "#334B99",
        }}
        onPress={() => finishQuiz(score)}
      >
        DESISTIR
      </Text>

      {/* <View
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
      </View> */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          {!modalData.finished ? (
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Voc?? {modalData.isCorrect ? "acertou!!!" : "errou!!!"}
            </Text>
            {/* <Text style={styles.modalText}>{modalData.justification}</Text> */}
            <Text style={styles.modalText}>
              {modalData.isCorrect ? "Parab??ns," : "Acontece!"} deseja passar para a pr??xima pergunta?
            </Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#334B99" }}
              onPress={nextQuestion}
            >
              <Text style={styles.textStyle}>PR??XIMA</Text>
            </TouchableHighlight>
          </View>
        ) :
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Parab??ns, voc?? terminou o Quiz!
          </Text>
          <Text style={styles.modalText}>
            Pontua????o total: {score}
          </Text>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#334B99" }}
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
    // marginTop: 22,
  },
  modalView: {
    width: "70%",
    backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.84,
    elevation: 5,
  },
  openButton: {
    alignContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#334B99",
    marginTop: 18,
    margin: 12,
    borderRadius: 4,
    padding: 10,
    // elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    width: "84%",
    marginTop: 24,
    // marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Quiz;
