import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  name: string;
  rentals: number;
  memberSince: string;
  cep?: string;
};

export function UserCard({ name, rentals, memberSince, cep }: Props) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.stats}>
          {rentals} aluguéis · Membro desde {memberSince}
        </Text>
      </View>
      {cep && (
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={14} color="#F97316" />
          <Text style={styles.locationText}>{cep}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  info: { flex: 1, padding: 16 },
  name: { fontSize: 16, fontWeight: "bold", color: "#171717" },
  stats: { fontSize: 12, color: "#737373", marginTop: 2 },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  locationText: { fontSize: 14, color: "#171717" },
});
