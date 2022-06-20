import React, { useState } from "react";
import { Text, SafeAreaView, TouchableOpacity, TextInput } from "react-native";

import { useAuthContext } from "../../hooks/useAuthContext";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { styles } from "./styles";
import { api } from "../../services/api";

export function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [tableNumber, setTableNumber] = useState<string>("");

  async function handleOpenOrder(): Promise<void> {
    if (tableNumber === "") {
      return;
    }

    const response = await api.post("/order", {
      table: Number(tableNumber),
    });

    const { id } = response.data;

    navigation.navigate("Order", {
      table: tableNumber,
      id,
    });

    setTableNumber("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Número da mesa"
        placeholderTextColor="rgba(240, 240, 240, 0.6)"
        keyboardType="numeric"
        value={tableNumber}
        onChangeText={setTableNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleOpenOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
