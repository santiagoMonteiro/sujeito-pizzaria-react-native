import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { Feather } from "@expo/vector-icons";

import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
  FinishOrder: {
    table: string;
    order_id: string;
  };
};

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">;

export function FinishOrder() {
  const route = useRoute<FinishOrderRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function handleFinishOrder(): Promise<void> {
    try {
      await api.patch("/order/send", {
        order_id: route.params?.order_id,
      });

      navigation.popToTop();
    } catch (err) {
      console.log("Erro ao finalizar, tente mais tarde");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        Você deseja finalizar esse pedido?
      </Text>
      <Text style={styles.tableText}>Mesa {route.params?.table}</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
        <Text style={styles.buttonText}>Finalizar pedido</Text>
        <Feather name="shopping-cart" size={20} color="#1d1d2e" />
      </TouchableOpacity>
    </View>
  );
}
