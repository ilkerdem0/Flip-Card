import React, { useState, useContext } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { Button } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { addQuiz } from "../../config/firebase";
import { Context } from "../../Context/Context";
import SegmentedControlTab from "react-native-segmented-control-tab";
const RegisterTextInput = (props) => {
    return (
        <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder={props.placeholder}
            onChangeText={(text) => props.setState(text)}
            secureTextEntry={props.security}
            value={props.value}
        />
    );
};

const Admin = ({ navigation }) => {
    const context = useContext(Context);
    const [value, setValue] = useState(0);
    const [question, setQuestion] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [trueAnswer, setTrueAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const questionPlaceholder = "Soru";
    const answerPlaceholder1 = "Cevap 1";
    const answerPlaceholder2 = "Cevap 2";
    const trueAnswerPlaceholder = "Doğru Cevap";
    const logoutButtonIconName = "log-out";
    const logoutButtonColor = "#3A2E61";


    return (
        <View>
            <LinearGradient
                // Background Linear Gradient
                colors={["#A8C2ED", "#FED6E3"]}
                style={styles.background}
            />
            <View style={styles.container}>
                <View style={{ flex: 2 }} />
                <View style={{ flexDirection: "column", alignItems: "space-between" }}>
                    <View ></View>
                    <TouchableOpacity
                        onPress={() => {
                            context.logout();
                        }}
                    >
                        <Entypo
                            name={logoutButtonIconName}
                            style={styles.cancel}
                            color={logoutButtonColor}
                            size={36}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }} />
                <Text style={styles.signText}>Soru Ekle</Text>
                <SegmentedControlTab
                    tabsContainerStyle={{
                        backgroundColor: "transparent",
                        width: "100%",
                    }}
                    tabStyle={{
                        backgroundColor: "rgba(105, 85, 170, 0.99)",
                        borderColor: "transparent",
                    }}
                    tabTextStyle={{ color: "#444444", fontWeight: "bold" }}
                    activeTabStyle={{ backgroundColor: "rgba(105, 85, 170, 0.99)" }}
                    values={["Kolay", "Orta", "Zor"]}
                    selectedIndex={value}
                    onTabPress={setValue}
                />
                <RegisterTextInput
                    placeholder={questionPlaceholder}
                    setState={setQuestion}
                    value={question}
                    security={false}
                />
                <RegisterTextInput
                    placeholder={answerPlaceholder1}
                    setState={setAnswer1}
                    value={answer1}
                    security={false}
                />
                <RegisterTextInput
                    placeholder={answerPlaceholder2}
                    setState={setAnswer2}
                    value={answer2}
                    security={false}
                />

                <RegisterTextInput
                    placeholder={trueAnswerPlaceholder}
                    setState={setTrueAnswer}
                    value={trueAnswer}
                    security={false}
                />

                <View style={{ flex: 1 }} />
                <Button
                    mode="contained"
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    onPress={async () => {
                        if (question != "" && answer1 != "" && answer2 != "" && trueAnswer != "") {
                            const name = value == 0 ? "kolay" : value == 1 ? "orta": "zor"
                            const res = await addQuiz(name,question, answer1, answer2, trueAnswer)
                            console.log(res)
                            if (res) {
                                setQuestion("")
                                setAnswer1("")
                                setAnswer2("")
                                setTrueAnswer("")
                            }
                        } else {
                            Alert.alert("Bütün alanlar doldurulmalıdır!")
                        }

                    }}
                    loading={isLoading}
                >
                    Ekle
                </Button>
                <View style={{ flex: 4 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    register: {
        marginTop: 175,
        justifyContent: "center",
        width: "100%",
        flexDirection: "row",
    },

    registerText: {
        height: 24,
        fontWeight: "normal",
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.165,
        color: "#6B56AB",
    },
    registerText2: {
        height: 24,
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 19,
        letterSpacing: -0.165,
        color: "#3A2E61",
    },
    input: {
        width: "100%",
        height: 60,
        borderColor: "#3A2E61",
        borderWidth: 2,
        marginTop: 25,
        backgroundColor: "transparent",
        borderRadius: 15,
        padding: 16,
        fontSize: 18,
        lineHeight: 22,
        letterSpacing: -0.165,
        fontStyle: "normal",
        fontStyle: "normal",
    },
    signText: {
        height: 31,

        color: "#3A2E61",
        fontSize: 26,
        lineHeight: 31,
        letterSpacing: -0.165,
        borderStyle: "solid",
        fontStyle: "normal",
        fontWeight: "bold",
        marginBottom: 25,
    },
    container: {
        marginHorizontal: 20,
        height: "100%",
    },
    button: {
        backgroundColor: "rgba(105, 85, 170, 0.99)",
        borderRadius: 15,
        height: 60,

        justifyContent: "center",
    },
    buttonContent: {
        width: "100%",
        height: "100%",
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 31,
        letterSpacing: -0.165,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,

        height: "100%",
    },
});

export default Admin;
