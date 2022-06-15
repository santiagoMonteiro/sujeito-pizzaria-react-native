import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useRoute, RouteProp } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

type RouteDetailParams = {
  Order: {
    id: string;
    table: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export function Order() {
  const route = useRoute<OrderRouteProps>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.table}</Text>
        <TouchableOpacity>
          <Feather name="trash-2" size={28} color="#ff3f4b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.whiteText}>Pizzas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={styles.whiteText}>Pizza de calabresa</Text>
      </TouchableOpacity>
    </View>
  );
}
