import React, { useContext } from "react";
import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateProfile,
  updateEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  getDocs,
  where,
  onSnapshot,
  collection,
  deleteDoc
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgRqIT30Dv7gdp0RcxiJNqIMUPzCXULIk",
  authDomain: "flip-card-9fc1b.firebaseapp.com",
  projectId: "flip-card-9fc1b",
  storageBucket: "flip-card-9fc1b.appspot.com",
  messagingSenderId: "579653129142",
  appId: "1:579653129142:web:8862f0ff3c0acbdfa96717",
  measurementId: "G-8C12KQ7RHW"
};

import { useNavigation } from "@react-navigation/native";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const signUp = async (name, email, password, setIsLoading) => {
  try {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });

    Alert.alert("Success", "Successfully signed up");
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    alert(error.message);
  }
};

export const signIn = async (email, password, setIsLoading) => {
  try {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setIsLoading(false);
    const res = await authState();
    console.log(res.providerData[0])
    return res;
  } catch (error) {
    alert(error);
    setIsLoading(false);
  }
};


const getUserId = () => {
  const user = auth.currentUser;

  // Check if user is authenticated
  if (user) {
    // Use the user's UID as the unique identifier
    return user.uid;
  } else {
    // Handle the case where the user is not authenticated

    return null;
  }
};

export const addUnknownWords = async (question) => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  const key = uuid();

  const querySnapshot = await getDocs(
    query(collection(db, "unknownWords"), where("userId", "==", userId))
  );
  const existingEntries = querySnapshot.docs.map((doc) => doc.data());
  let existingItem = false;
  existingEntries.forEach((item) => {
    if (item.question.question == question.question) {
      existingItem = true;
    }
  });

  if (!existingItem) {
    await setDoc(doc(db, "unknownWords", key), {
      userId: userId,
      question: question,
    });
  } else {

  }
};

export const addQuiz = async (name,question, answer1, answer2, trueAnswer) => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  const key = uuid();

try {
  await setDoc(doc(db, name, key), {
    answer: answer1,
    answer2: answer2,
    question: question,
    trueAnswer: trueAnswer

  });
  Alert.alert("Soru başarıyla eklendi.")
  return true
} catch (error) {
  Alert.alert("Soru eklenemedi!")
}
return false


};

export const addKnownWords = async (question) => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  const key = uuid();

  const querySnapshot = await getDocs(
    query(collection(db, "knownWords"), where("userId", "==", userId))
  );
  const existingEntries = querySnapshot.docs.map((doc) => doc.data());
  let existingItem = false;
  existingEntries.forEach((item) => {
    if (item.question.question == question.question) {
      existingItem = true;
    }
  });

  if (!existingItem) {
    await setDoc(doc(db, "knownWords", key), {
      userId: userId,
      question: question,
    });
  } else {
    console.log("Entry already exists for the user");
  }
};

export const addFavorites = async (question) => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  const key = uuid();

  const querySnapshot = await getDocs(
    query(collection(db, "favorites"), where("userId", "==", userId))
  );
  const existingEntries = querySnapshot.docs.map((doc) => doc.data());
  let existingItem = false;
  existingEntries.forEach((item) => {
    if (item.question.question == question.question) {
      existingItem = true;
    }
  });
  if (!existingItem) {
    await setDoc(doc(db, "favorites", key), {
      userId: userId,
      question: question,
    });
  } else {
    console.log("Entry already exists for the user");
  }
};

export const getUnknownWords = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return [];
  }

  try {
    const querySnapshot = await getDocs(
      query(collection(db, "unknownWords"), where("userId", "==", userId))
    );
    const unknownWords = querySnapshot.docs.map((doc) => doc.data());

    return unknownWords;
  } catch (error) {

    throw error;
  }
};

export const getKnownWords = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return [];
  }

  try {
    const querySnapshot = await getDocs(
      query(collection(db, "knownWords"), where("userId", "==", userId))
    );
    const knownWords = querySnapshot.docs.map((doc) => doc.data());

    return knownWords;
  } catch (error) {
    console.error("Error getting knownWords: ", error);
    throw error;
  }
};

export const getFavoriteWords = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return [];
  }

  try {
    const querySnapshot = await getDocs(
      query(collection(db, "favorites"), where("userId", "==", userId))
    );
    const favorites = querySnapshot.docs.map((doc) => doc.data());

    return favorites;
  } catch (error) {
    console.error("Error getting favorites: ", error);
    throw error;
  }
};

export const getQuiz = async (name) => {
  try {
    const querySnapshot = await getDocs(collection(db, name));
    const quiz = querySnapshot.docs.map((doc) => doc.data());
    console.log(quiz);
    return quiz;
  } catch (error) {
    console.error("Error getting quiz: ", error);
    throw error;
  }
};

export const authState = async () => {
  var res = "";
  await onAuthStateChanged(auth, function (user) {
    if (user) {
      res = user;
    }
  });
  return res;
};



export const updateUser = async (name, email) => {
  try {
    if (name !== "" && email !== "") {
      await updateProfile(auth.currentUser, { displayName: name });
      await updateEmail(auth.currentUser, email)
        .then(() => {
          authState();
          Alert.alert("Success", "Changes saved");
        })
        .catch((error) => {
          alert(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllFavorites = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  try {
    // Get all favorite entries for the user
    const querySnapshot = await getDocs(
      query(collection(db, "favorites"), where("userId", "==", userId))
    );

    // Delete each favorite entry
    const deletePromises = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    console.log("All favorites deleted successfully");
  } catch (error) {
    console.error("Error deleting favorites: ", error);
    throw error;
  }
};


export const deleteAllKnownWords = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  try {
    // Get all favorite entries for the user
    const querySnapshot = await getDocs(
      query(collection(db, "knownWords"), where("userId", "==", userId))
    );

    // Delete each favorite entry
    const deletePromises = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    console.log("Known Words deleted successfully");
  } catch (error) {
    console.error("Error deleting favorites: ", error);
    throw error;
  }
};

export const deleteAllUnknownWords = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  try {
    // Get all favorite entries for the user
    const querySnapshot = await getDocs(
      query(collection(db, "unknownWords"), where("userId", "==", userId))
    );

    // Delete each favorite entry
    const deletePromises = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    console.log("Unknown Words deleted successfully");
  } catch (error) {
    console.error("Error deleting favorites: ", error);
    throw error;
  }
};