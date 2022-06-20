import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuthContext } from "../hooks/useAuthContext";

export function Routes() {
  const { isAuthenticated, isLoadingOfflineData } = useAuthContext();

  if (isLoadingOfflineData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={60} color="#F5F7FB" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D2E",
    justifyContent: "center",
    alignItems: "center",
  },
});
