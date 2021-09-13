import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Modal,
} from "react-native";
import api from "../../../services/api";
import { useContext } from "react";
import { useAuth } from "../../../contexts/auth";
import * as C from "./styles";
import backgroundVector from "../../../assets/bg.png";

export type RankingData = {
  name: string;
  lastName: string;
  score: number;
};

export default function Ranking() {
  const { user, signOut } = useAuth();
  const [ranking, setRanking] = useState<RankingData[]>([]);

  useEffect(() => {
    console.log('useEffect quiz called');
    loadRanking();
  }, []);

  const loadRanking = async () => {
    console.log('loadRanking quiz called');
    try {
      api.post("/users/ranking").then((res) => {
        const data = res.data.data;
        // console.log('data retornada:', data, ', length:', data.length, ', isarray:', Array.isArray(data));
        if (Array.isArray(data)) setRanking(data);
      });
    } catch(ex) {
      console.log('erro buscando ranking.', ex);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratulations}>
          Parabéns {user ? (", " + user.name + "!") : "!"}
        </Text>
      <View style={styles.rankingContainer}>
        <Text style={styles.classification}>
          Classificação Geral:
        </Text>
        {ranking.map((data, index) => {
          return (
            <View key={index.toString()} style={styles.rankingEntry}>
              <Text style={styles.name}>{data.name} {data.lastName}</Text>
              <Text style={styles.rank}>{index + 1}º ({data.score} pontos)</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  congratulations: {
    flex: 1,
    fontSize: 34,
    color: "rgba(0, 0, 0, 0.87)",
    marginVertical: 40
  },
  classification: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.6)",
    marginVertical: 30
  },
  rankingContainer: {
    flex: 3,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column"
  },
  rankingEntry: {
    width: "90%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 14
  },
  name: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)"
  },
  rank: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.38)"
  }
});