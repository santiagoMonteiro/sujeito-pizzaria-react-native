import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useAuthContext } from "../../hooks/useAuthContext";

export function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn } = useAuthContext();

  async function handleLoginSubmit(): Promise<void> {
    if (email === "" || password === "") {
      return;
    }

    await signIn({
      email,
      password,
    });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          placeholderTextColor="rgba(240, 240, 240, 0.6)"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Sua senha"
          style={styles.input}
          placeholderTextColor="rgba(240, 240, 240, 0.6)"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
          <Text style={styles.buttonText}>ACESSAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D1D2E",
  },
  logo: {
    marginBottom: 18,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 34,
    paddingHorizontal: 14,
  },
  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#101026",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#FFF",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#3FFFA3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#101026",
  },
});
