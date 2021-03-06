import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

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

type Item = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

export function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [categories, setCategories] = useState<Category[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [categoryModalVisibility, setCategoryModalVisibility] =
    useState<boolean>(false);

  const [products, setProducts] = useState<Product[] | []>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [productModalVisibility, setProductModalVisibility] =
    useState<boolean>(false);

  const [itemsAmount, setItemsAmount] = useState<string>("1");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get("/category");

      setCategories(response.data);
      setSelectedCategory(response.data[0]);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
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

  async function handleCloseOrder(): Promise<void> {
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

  async function handleAddItem(): Promise<void> {
    const response = await api.post("/order/add", {
      order_id: route.params?.id,
      product_id: selectedProduct?.id,
      amount: Number(itemsAmount),
    });

    const data = {
      id: response.data.id,
      product_id: selectedProduct?.id as string,
      name: selectedProduct?.name as string,
      amount: itemsAmount,
    };

    setItems([...items, data]);
    setItemsAmount("1");
  }

  async function handleDeleteItem(item_id: string): Promise<void> {
    await api.delete("/order/remove", {
      params: {
        item_id,
      },
    });

    const updatedItems = items.filter((item) => item.id !== item_id);

    setItems(updatedItems);
  }

  function handleRedirectToFinishPage() {
    navigation.navigate("FinishOrder", {
      table: route.params?.table,
      order_id: route.params?.id,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.table}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#ff3f4b" />
          </TouchableOpacity>
        )}
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.forwardButton,
            {
              opacity: items.length === 0 ? 0.3 : 1,
            },
          ]}
          disabled={items.length === 0}
          onPress={handleRedirectToFinishPage}
        >
          <Text style={styles.buttonText}>Avan??ar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem data={item} deleteItem={handleDeleteItem} />
        )}
      />

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

      <Modal
        transparent={true}
        visible={productModalVisibility}
        animationType="fade"
      >
        <ModalPicker
          options={products}
          handleCloseModal={() => setProductModalVisibility(false)}
          selectedItem={setSelectedProduct}
        />
      </Modal>
    </View>
  );
}
