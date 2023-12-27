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
import {
  List,
  Avatar,
  Divider,
  Portal,
  Dialog,
  TextInput,
  Button,
} from "react-native-paper";
import { Context } from "../../Context/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { addChat, getChats, authState } from "../../config/firebase";


const Quizs = ({ navigation }) => {
  const pageTitle = "Kategoriler";

  const backColor = ["#E4DEE5", "#FBECFF"];

const options = [
    "Kolay","Orta","Zor"
]
 

  const renderListItem = ({item}) => (
    <List.Item
    style={{
        backgroundColor: "#b8b4fc",
        marginVertical: "5%",
        borderRadius: 10,
      }}
      title={item}
      titleStyle={styles.title}
      right ={() => (
       <MaterialCommunityIcons name="chevron-right" size={36} color="#3A2E61"/>
      )}
    
      onPress={() => navigation.navigate("Quiz", { categoryName: item })}
    />
  );



  return (
    <View>
      <LinearGradient colors={backColor} style={styles.background} />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Text style={styles.pageTitle}>{pageTitle}</Text>
           
          </View>
          <BlurView intensity={105} style={styles.body}>
            <View style={styles.list}>
              
                <FlatList data={options} renderItem={renderListItem} />
             
            </View>
          </BlurView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Quizs;

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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? "10%" : "20%",
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
    fontSize: 18,
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
    marginLeft: 25,
  },
  chatButton: {
    marginRight: 20,
    color: "#3A2E61",
  },
});