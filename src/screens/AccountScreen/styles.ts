import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#171717",
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A3A3A3",
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 4,
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#F5F5F5",
    marginLeft: 72,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#FEE2E2",
    backgroundColor: "#FFF5F5",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#EF4444",
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#A3A3A3",
    marginBottom: 8,
  },
});
