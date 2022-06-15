import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useAuthContext } from "../../hooks/useAuthContext";
import { styles } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn, loadingAuth } = useAuthContext();

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
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>ACESSAR</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
