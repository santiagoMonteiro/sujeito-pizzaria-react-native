import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    width: "100%",
    height: 40,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#fff",
    fontSize: 20,
  },
  whiteText: {
    color: "#FFF",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  amountButton: {
    width: "60%",
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  addButton: {
    width: "20%",
    backgroundColor: "#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: "bold",
  },
  forwardButton: {
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    flex: 1,
    marginTop: 24,
  }
});
