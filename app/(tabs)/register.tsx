import apiClient from "@/shared/libs/api-client";
import { Error } from "@/shared/types/error";
import { getCookieValue } from "@/shared/utils/cookie";
import { AxiosError } from "axios";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match!");
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/register", {
        email,
        username,
        phone,
        password,
      });
      await SecureStore.setItemAsync("SESSION", res.data.cookie);
      router.replace("/apps");
    } catch (error) {
      const err = error as AxiosError<Error>;
      Alert.alert(
        "Registration Failed",
        err.response?.data.message || "An error occurred during registration.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor="#888"
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder={`Phone (without "-")`}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoCapitalize="none"
            placeholderTextColor="#888"
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#888"
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.5 }]}
            onPress={handleRegister}
            disabled={loading}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <Link
            href="/login"
            style={[styles.link, loading && { opacity: 0.5 }]}
            aria-disabled={loading}>
            Already have an account? Login
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: "blue",
  },
});
