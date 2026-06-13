import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export type ToolProps = {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
};

type ToolCardProps = {
  item: ToolProps;
  onPress: () => void;
};

export const ToolCard = ({ item, onPress }: ToolCardProps) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.toolTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>
          R$ {item.price.toFixed(2).replace(".", ",")}
          <Text style={styles.priceSuffix}>/dia</Text>
        </Text>
        <View style={styles.footer}>
          <View style={styles.infoRow}>
            <Feather name="map-pin" size={12} color="#737373" />
            <Text style={styles.infoText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#E5E5E5",
  },
  content: {
    padding: 12,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    color: "#A3A3A3",
    marginLeft: 2,
  },
  priceSuffix: {},
  footer: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#737373",
    flex: 1,
  },
});
