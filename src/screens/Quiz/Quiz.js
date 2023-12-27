import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  getQuiz,
  addKnownWords,
  addUnknownWords,
  addFavorites,
} from "../../config/firebase";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,  
} from "react-native-alert-notification";
import * as Animatable from 'react-native-animatable';

import { useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [trueAnswers, setTrueAnswers] = useState(0);
  const [falseAnswers, setFalseAnswers] = useState(0);
  const [favIcon, setFavIcon] = useState("star-o");
  useFocusEffect(
    React.useCallback(() => {
      // Reset values when the component is focused
      setFalseAnswers(0);
      setTrueAnswers(0);
      setQuestionNumber(0);
      setFavIcon("star-o");
    }, [])
  );
  const cardRef = useRef(null);
  const rotateCard = (ref) => {
    cardRef.current.flipInX(360); // react-native-animatable'ın swing animasyonu
  };
  useEffect(() => {
    async function fetchQuiz() {
      const quiz = await getQuiz();

      setQuiz(quiz);
    }

    fetchQuiz();
  }, []);
  const rotate360 = { 
    0: {
      rotate: '0deg',
    },
    1: {
      rotate: '360deg',
    },
  };
  

  return (
    <AlertNotificationRoot>
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", backgroundColor: "#FBECFF" }}
      >
        {quiz.length > 0 ? (
          <Animatable.View ref={cardRef}>
            {/* Rectangle */}
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 30,
                paddingBottom: 40,
                marginTop: "20%",
                overflow: "hidden", // Çemberlerin taşan kısımlarını gizler
              }}
            >
              <View
                style={{
                  width: 337,
                  height: 228,
                  backgroundColor: "#A42FC1",
                  borderRadius: 30,
                  position: "relative",
                  justifyContent: "center", // İçteki dikdörtgenin içeriğini ortalamak için
                  alignItems: "center", // İçteki dikdörtgenin içeriğini ortalamak için
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    width: 90,
                    height: 90,
                    backgroundColor: "#AD43C7",
                    borderRadius: 45,
                    left: 78,
                    top: -34,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    width: 90,
                    height: 90,
                    backgroundColor: "#AD43C7",
                    borderRadius: 45,
                    left: -45,
                    top: 69,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    width: 90,
                    height: 90,
                    backgroundColor: "#AD43C7",
                    borderRadius: 45,
                    left: 279,
                    top: 88,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    width: 40,
                    height: 40,
                    backgroundColor: "#AD43C7",
                    borderRadius: 20,
                    left: 207,
                    top: 16,
                  }}
                />
                {/* Yeni dikdörtgen */}
                <View
                  style={{
                    position: "absolute",
                    width: 281,
                    height: 180,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#000000",
                    left: 28,
                    top: 143,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "space-between",
                      justifyContent: "flex-end",
                      margin: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={async () => {
                        setFavIcon("star");
                        await addFavorites(quiz[questionNumber]);
                      }}
                    >
                      <FontAwesome color="#b8b4fc" name={favIcon} size={28} />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      margin: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#A42FC1",

                        fontSize: 18,
                        fontWeight: "500",
                        lineHeight: 24,
                      }}
                    >
                      Soru {questionNumber + 1}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      margin: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#2B262D",

                        fontSize: 22,
                        fontWeight: "500",
                        lineHeight: 24,

                        textAlign: "center",
                      }}
                    >
                      {JSON.stringify(quiz[questionNumber].question).slice(
                        1,
                        -1
                      )}
                    </Text>
                  </View>
                </View>

                {/* "05" ve "07" yazıları */}
              </View>

              {/* Touchable Opacityler */}
              <View style={{ marginTop: "40%" }}>
                <TouchableOpacity
                  style={{
                    width: 240,
                    height: 48,
                    backgroundColor: "transparent",
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: "#A42FC1",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingLeft: 21,
                    paddingRight: 21,
                    marginLeft: 48,
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    setFavIcon("star-o");
                    if (
                      quiz[questionNumber].answer ==
                      quiz[questionNumber].trueAnswer
                    ) {
                      setTrueAnswers(trueAnswers + 1);
                      Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: "Doğru",
                        textBody: "Tebrikler Doğru Bildiniz!",
                        button: "Kapat",
                      });
                      addKnownWords(quiz[questionNumber]);
                    } else {
                      setFalseAnswers(falseAnswers + 1);
                      Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: "Yanlış",
                        textBody: "Maalesef Yanlış Bildiniz!",
                        button: "Kapat",
                      });
                      addUnknownWords(quiz[questionNumber]);
                    }
                    rotateCard();
                    if (questionNumber + 2 <= quiz.length) {
                      setQuestionNumber(questionNumber + 1);
                    } else {
                      setFalseAnswers(0);
                      setTrueAnswers(0);
                      setQuestionNumber(0);
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "#2B262D",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {quiz[questionNumber].answer}
                  </Text>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: "#F5F5F5",
                      borderRadius: 11,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 240,
                    height: 48,
                    backgroundColor: "transparent",
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: "#A42FC1",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingLeft: 21,
                    paddingRight: 21,
                    marginLeft: 48,
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    setFavIcon("star-o");
                    if (
                      quiz[questionNumber].answer2 ==
                      quiz[questionNumber].trueAnswer
                    ) {
                      setTrueAnswers(trueAnswers + 1);
                      Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: "Doğru",
                        textBody: "Tebrikler Doğru Bildiniz!",
                        button: "Kapat",
                      });
                      addKnownWords(quiz[questionNumber]);
                    } else {
                      setFalseAnswers(falseAnswers + 1);
                      Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: "Yanlış",
                        textBody: "Maalesef Yanlış Bildiniz!",
                        button: "Kapat",
                      });
                      addUnknownWords(quiz[questionNumber]);
                    }
                    rotateCard();
                    if (questionNumber + 2 <= quiz.length) {
                      setQuestionNumber(questionNumber + 1);
                    } else {
                      setFalseAnswers(0);
                      setTrueAnswers(0);
                      setQuestionNumber(0);
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "#2B262D",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {quiz[questionNumber].answer2}
                  </Text>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: "#F5F5F5",
                      borderRadius: 11,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 240,
                    height: 48,
                    backgroundColor: "transparent",
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: "#A42FC1",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingLeft: 21,
                    paddingRight: 21,
                    marginLeft: 48,
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    setFavIcon("star-o");
                    setFalseAnswers(falseAnswers + 1);
                    Dialog.show({
                      type: ALERT_TYPE.WARNING,
                      title: "Bilmiyorum",
                      textBody:
                        "Maalesef bilemediniz. Cevap " +
                        quiz[questionNumber].answer +
                        " olacaktı !",
                      button: "Kapat",
                    });
                    rotateCard();
                    addUnknownWords(quiz[questionNumber]);
                    if (questionNumber + 2 <= quiz.length) {
                      setQuestionNumber(questionNumber + 1);
                    } else {
                      setFalseAnswers(0);
                      setTrueAnswers(0);
                      setQuestionNumber(0);
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "#2B262D",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Bilmiyorum
                  </Text>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: "#F5F5F5",
                      borderRadius: 11,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        ) : (
          <Text>Loading...</Text>
        )}
      </SafeAreaView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
