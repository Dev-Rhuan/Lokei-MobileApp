import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F0",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
  },
  cancelText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#A3A3A3",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#737373",
    marginLeft: 4,
    fontWeight: "400",
    marginBottom: 8,
  },
  hint: {
    fontSize: 11,
    color: "#A3A3A3",
  },
  conditionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  conditionPill: {
    flex: 1,
    height: 44,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  conditionPillActive: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1.5,
    borderColor: "#F97316",
  },
  conditionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#525252",
  },
  conditionTextActive: {
    color: "#F97316",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#F0F9FF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    color: "#0369A1",
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "#FAFAFA",
    borderTopWidth: 1,
    borderTopColor: "#F1F1F0",
  },
});
