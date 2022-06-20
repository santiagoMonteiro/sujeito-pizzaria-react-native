import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";

type RouteDetailParams = {
  Order: {
    id: string;
    table: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
};

export function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [categories, setCategories] = useState<Category[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [categoryModalVisibility, setCategoryModalVisibility] =
    useState<boolean>(false);

  const [products, setProducts] = useState<Product[] | []>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [productModalVisibility, setProductModalVisibility] =
    useState<boolean>(false);

  const [itemsAmount, setItemsAmount] = useState<string>("1");

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get("/category");

      setCategories(response.data);
      setSelectedCategory(response.data[0]);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/category/product", {
        params: {
          category_id: selectedCategory?.id,
        },
      });

      setProducts(response.data);
      setSelectedProduct(response.data[0]);
    }

    loadProducts();
  }, [selectedCategory]);

  async function handleCloseOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.id,
        },
      });

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.table}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name="trash-2" size={28} color="#ff3f4b" />
        </TouchableOpacity>
      </View>

      {categories.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setCategoryModalVisibility(true)}
        >
          <Text style={styles.whiteText}>{selectedCategory?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setProductModalVisibility(true)}
        >
          <Text style={styles.whiteText}>{selectedProduct?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>Quantidade</Text>
        <TextInput
          placeholder="1"
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric"
          style={[styles.input, styles.amountButton]}
          value={itemsAmount}
          onChangeText={setItemsAmount}
        />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forwardButton}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={categoryModalVisibility}
        animationType="fade"
      >
        <ModalPicker
          options={categories}
          handleCloseModal={() => setCategoryModalVisibility(false)}
          selectedItem={setSelectedCategory}
        />
      </Modal>
    </View>
  );
}
