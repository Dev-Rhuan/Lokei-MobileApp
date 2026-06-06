import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FAFAFA",
    padding: 24,
  },
  header: {
    marginTop: "auto",
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
    width: 350,
  },
  inputWrapper: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: "#737373",
    marginLeft: 4,
    fontWeight: "400",
    marginBottom: 8,
  },
  footer: {
    marginTop: "auto",
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
