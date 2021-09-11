import { questions } from "../screens/Quiz/questions";

export const _ = (array: any[]) => [...array].sort(() => Math.random() - 0.7);

export type Question = {
  id: string,
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
};

export type QuestionsState = Question & { answers: string[] };

export const getQuizQuestions = async () => {
  const data = questions;
  console.log('getQuizQuestions called.');
  return data.results.map((questions: Question) => ({
    ...questions,
    answers: _([...questions.incorrect_answers, questions.correct_answer]),
  }));
};
