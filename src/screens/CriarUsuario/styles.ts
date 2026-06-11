import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 24,
  },

  progress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    marginBottom: 36,
    height: 40,
  },

  header: {
    marginBottom: 4,
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
    maxWidth: "95%",
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
    paddingBottom: 8,
  },

  footerText: {
    fontSize: 14,
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
