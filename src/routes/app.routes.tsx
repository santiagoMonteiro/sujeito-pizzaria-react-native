import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Dashboard } from "../pages/Dashboard";
import { Order } from "../pages/Order";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    id: string
    table: string;
  };
};

const Stack = createNativeStackNavigator<StackParamsList>();

export function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
