import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export type ToolProps = {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
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
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Feather name="heart" size={18} color="#A3A3A3" />
        </TouchableOpacity>
        <View style={styles.distanceBadge}>
          <Feather name="map-pin" size={12} color="#F97316" />
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FBBF24" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>

        <Text style={styles.toolTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceCurrency}>R$ </Text>
          <Text style={styles.priceValue}>{item.price}</Text>
          <Text style={styles.priceUnit}>/dia</Text>
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
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: "100%" },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  distanceBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  distanceText: { fontSize: 12, color: "#404040", fontWeight: "600" },
  cardContent: {},
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#404040",
    marginLeft: 4,
  },
  reviewsText: { fontSize: 12, color: "#A3A3A3", marginLeft: 2 },
  toolTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 8,
    lineHeight: 20,
  },
  priceRow: { flexDirection: "row", alignItems: "baseline" },
  priceCurrency: { fontSize: 14, fontWeight: "bold", color: "#F97316" },
  priceValue: { fontSize: 20, fontWeight: "bold", color: "#171717" },
  priceUnit: { fontSize: 12, color: "#A3A3A3", marginLeft: 2 },
});
