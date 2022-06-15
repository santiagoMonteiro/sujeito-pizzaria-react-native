import React from "react";
import { View, Text, Button } from "react-native";
import { useAuthContext } from "../../hooks/useAuthContext";

export function Dashboard() {
  const { signOut } = useAuthContext();

  return (
    <View>
      <Text>Hello dashboard</Text>
      <Button title="Sair do app" onPress={signOut} />
    </View>
  );
}