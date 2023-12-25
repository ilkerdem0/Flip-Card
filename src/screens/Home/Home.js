import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { getKnownWords, getUnknownWords } from "../../config/firebase";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { DonutChart } from "react-native-circular-chart";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function Home() {
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [knownWordsLength, setKnownWordsLength] = useState(1);
  const [unknownWordsLength, setUnknownWordsLength] = useState(1);
  useFocusEffect(
    React.useCallback(() => {
      fetchQuiz();
    }, [])
  );
  async function fetchQuiz() {
    const knownWords = await getKnownWords();
    const unknownWords = await getUnknownWords();

    setKnownWordsLength(knownWords.length);
    setUnknownWordsLength(unknownWords.length);
    setKnownWords(knownWords);
    setUnknownWords(unknownWords);
    setDataLoading(false);
  }

  useEffect(() => {
    fetchQuiz();
  }, []);

  const DATA = [
    {
      name: "Doğru",
      value: knownWordsLength,
      color: "#A42FC1",
    },
    {
      name: "Yanlış",
      value: unknownWordsLength,
      color: "#b8b4fc",
    },
  ];

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.pageTitle}>Analiz</Text>
        </View>
        {dataLoading ? (
          <ActivityIndicator size={"large"} color={"#A42FC1"} />
        ) : (
          <View style={styles.sectionWrapper}>
            <DonutChart
              data={DATA}
              strokeWidth={15}
              radius={90}
              containerWidth={300}
              containerHeight={105 * 2}
              type="round"
              startAngle={0}
              endAngle={360}
              animationType="slide"
            />
            <View style={{ flexDirection: "row" }}>
              {DATA.map((d) => {
                return (
                  <View
                    style={{
                      flexDirection: "column",
                      marginHorizontal: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={d.name}
                  >
                    <Text
                      style={{
                        color: d.color,
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      {d.name}
                    </Text>
                    <Text
                      style={{
                        color: d.color,
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      {d.value}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </SafeAreaView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBECFF",
    alignItems: "center",
  },
  sectionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    borderRadius: 8,
    borderColor: "transparent",
    backgroundColor: "#FAECFF",
    marginVertical: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.41,

    elevation: 2,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? "10%" : "20%",
  },
  pageTitle: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 32,
    lineHeight: 31,
    letterSpacing: -0.165,
    color: "#3A2E61",

    marginBottom: 125,
  },
});
