import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Category } from "../../pages/Order";

import { styles } from "./styles";

interface ModalPickerProps {
  options: Category[];
  handleCloseModal: () => void;
  selectedItem: (option: Category) => void;
}

export function ModalPicker({
  options,
  handleCloseModal,
  selectedItem,
}: ModalPickerProps) {
  function handleOptionChoice(option: Category) {
    selectedItem(option);
    handleCloseModal();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {options.map((option) => {
            return (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={() => handleOptionChoice(option)}
              >
                <Text style={styles.optionText}>{option?.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}
