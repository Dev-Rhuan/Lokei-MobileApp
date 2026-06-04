import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    padding: 24,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    color: "#171717",
    fontWeight: "700",
    letterSpacing: -0.52,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 13,
    color: "#737373",
    marginTop: 8,
    lineHeight: 18,
    maxWidth: 280,
  },
  inputWrapper: {
    marginTop: 20,
  },
  label: {
    fontSize: 11,
    color: "#737373",
    marginLeft: 4,
    fontWeight: "600",
    marginBottom: 6,
  },
  button: {
    width: "100%",
    height: 56,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F97316",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#737373",
    fontWeight: "400",
  },
  linkText: {
    color: "#F97316",
    fontWeight: "700",
  },
});
