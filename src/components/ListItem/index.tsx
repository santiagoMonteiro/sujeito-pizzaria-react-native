import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

interface ListItemProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };

  deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ListItemProps) {

  function handleDeleteItem() {
    deleteItem(data.id);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {data.amount} - {data.name}
      </Text>
      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name="trash-2" color="#ff3f4b" size={25} />
      </TouchableOpacity>
    </View>
  );
}
