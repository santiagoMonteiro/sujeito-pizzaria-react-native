import { Dimensions, StyleSheet } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: WIDTH - 20,
    height: HEIGHT / 2,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#8A8A8A",
    borderRadius: 4,
  },
  option: {
    alignItems: "flex-start",
    borderTopWidth: 0.8,
    borderTopColor: "#8A8A8A",
  },
  optionText: {
    margin: 18,
    fontSize: 14,
    fontWeight: "bold",
    color: "#101026",
  },
});
