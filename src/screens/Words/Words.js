import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import { List } from "react-native-paper";
import { Context } from "../../Context/Context";
import { useFocusEffect } from "@react-navigation/native";
import {
  getFavoriteWords,
  getUnknownWords,
  getKnownWords,
} from "../../config/firebase";
import SegmentedControlTab from "react-native-segmented-control-tab";
const Words = ({ navigation }) => {
  const pageTitle = "Messages";
  const indicatorColor = "#3A2E61";
  const backColor = ["#E4DEE5", "#FED6E3"];
  const context = useContext(Context);

  const [dataLoading, setDataLoading] = useState(true);
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [value, setValue] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      fetchQuiz();
    }, [])
  );
  async function fetchQuiz() {
    const knownWords = await getKnownWords();
    const unknownWords = await getUnknownWords();
    const favorites = await getFavoriteWords();
    setDataLoading(false);
    setKnownWords(knownWords);
    setUnknownWords(unknownWords);
    setFavorites(favorites);
  }

  useEffect(() => {
    fetchQuiz();
  }, []);

  const renderListItem = ({ item }) => (
    <List.Item
      style={{
        backgroundColor: "#b8b4fc",
        marginVertical: "5%",
        borderRadius: 10,
      }}
      left={() => <Text style={styles.title}>{item.question.question}</Text>}
      right={() => <Text style={styles.title}>{item.question.trueAnswer}</Text>}
    />
  );

  return (
    <View>
      <LinearGradient colors={backColor} style={styles.background} />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.head}>
            <SegmentedControlTab
              tabsContainerStyle={{
                backgroundColor: "transparent",
                width: "90%",
              }}
              tabStyle={{
                backgroundColor: "#b8b4fc",
                borderColor: "transparent",
              }}
              tabTextStyle={{ color: "#444444", fontWeight: "bold" }}
              activeTabStyle={{ backgroundColor: "#b8b4fc" }}
              values={["Favoriler", "Bilinmeyenler", "Öğrendiklerim"]}
              selectedIndex={value}
              onTabPress={setValue}
            />
          </View>

          <BlurView intensity={105} style={styles.body}>
            <Text style={styles.pageTitle}>Kelimeler</Text>
            <View style={styles.list}>
              {dataLoading ? (
                <ActivityIndicator size={"large"} color={indicatorColor} />
              ) : (
                <FlatList
                  data={
                    value == 0
                      ? favorites
                      : value == 1
                      ? unknownWords
                      : knownWords
                  }
                  renderItem={renderListItem}
                />
              )}
            </View>
          </BlurView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Words;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  avatar: {
    marginRight: 14,
    borderRadius: 25,
    width: 63.05,
    height: 66,
    backgroundColor: "#BDB0E7",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  head: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? "10%" : "20%",
    width: "100%",
  },
  body: {
    marginTop: 40,
    backgroundColor: "#D7D2E0",
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },

  list: {
    marginTop: 34,
    marginHorizontal: 20,
  },
  title: {
    fontStyle: "normal",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 23,
    letterSpacing: 0.5,
    color: "#3A2E61",
    marginBottom: 4,
  },
  description: {
    opacity: 0.5,
    color: "#3A2E61",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  pageTitle: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 26,
    lineHeight: 31,
    letterSpacing: -0.165,
    color: "#3A2E61",
    marginTop: 20,
    marginLeft: 25,
  },
});
