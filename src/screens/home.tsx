import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ToolCard, ToolProps } from "../components/Card";
import { BottomNavBar } from "../components/NavBar";

const CATEGORIES = ["Todos", "Furadeiras", "Jardim", "Construção"];
const MOCK_TOOLS: ToolProps[] = [
  {
    id: "1",
    title: "Furadeira de Impacto DeWalt",
    price: 35,
    rating: 4.9,
    reviews: 128,
    location: "Pinheiros",
    distance: "1,2 km",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: 'Motosserra a Gasolina 16"',
    price: 70,
    rating: 4.8,
    reviews: 64,
    location: "Vila Madalena",
    distance: "2,5 km",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80",
  },
];

export const Home = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const [activeCategory, setActiveCategory] = useState("Todos");

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={MOCK_TOOLS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {/* BUSCA */}
            <View style={styles.searchSection}>
              <View style={styles.searchInputContainer}>
                <Feather name="search" size={20} color="#A3A3A3" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar ferramentas..."
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>

            {/* CATEGORIAS */}
            <View style={styles.categoriesSection}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={CATEGORIES}
                keyExtractor={(item) => item}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
                renderItem={({ item }) => {
                  const isActive = activeCategory === item;
                  return (
                    <TouchableOpacity
                      onPress={() => setActiveCategory(item)}
                      style={[
                        styles.categoryPill,
                        isActive && styles.categoryPillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          isActive && styles.categoryTextActive,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* TÍTULO DA SEÇÃO */}
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Perto de você</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <ToolCard
            item={item}
            onPress={() => navigate("toolDetails", { id: item.id })}
          />
        )}
      />

      <BottomNavBar bottomInset={insets.bottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  locationHeader: { fontSize: 14, color: "#737373", fontWeight: "500" },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#171717" },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  searchInput: { flex: 1, fontSize: 16, color: "#171717" },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#F97316",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  categoriesSection: { marginBottom: 24 },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  categoryPillActive: { backgroundColor: "#F97316", borderColor: "#F97316" },
  categoryText: { fontSize: 14, color: "#737373", fontWeight: "600" },
  categoryTextActive: { color: "#fff" },
  row: { justifyContent: "space-between", paddingHorizontal: 16 },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#171717" },
  seeAllText: { fontSize: 14, color: "#F97316", fontWeight: "600" },
});
