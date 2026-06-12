import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Importando o Supabase e a tipagem do Card
import { supabase } from "../services/supabase";
import { ToolCard, ToolProps } from "../components/Card";
import { BottomNavBar } from "../components/NavBar";

export const Home = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState("Todos");

  // 1. Estados para armazenar os anúncios do banco e o carregamento
  const [tools, setTools] = useState<ToolProps[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Função que vai lá no Supabase buscar os anúncios
  async function fetchAnuncios() {
    try {
      setLoading(true);

      // Busca na tabela 'anuncio' e traz também a URL da imagem relacionada
      const { data, error } = await supabase
        .from("anuncio")
        .select(
          `
          id,
          titulo,
          preco,
          cep,
          anuncio_imagem ( url )
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        // Formata os dados para o padrão que o ToolCard espera
        const formattedTools: ToolProps[] = data.map((item) => {
          const imageUrl =
            item.anuncio_imagem?.[0]?.url ||
            "https://reactnative.dev/img/tiny_logo.png";

          return {
            id: item.id,
            title: item.titulo,
            price: Number(item.preco),
            location: item.cep,
            image: imageUrl,
          };
        });

        setTools(formattedTools);
      }
    } catch (error) {
      console.error("Erro ao buscar anúncios:", error);
    } finally {
      setLoading(false);
    }
  }

  // 3. Executa a função assim que o usuário entra na Home
  useEffect(() => {
    fetchAnuncios();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Se estiver carregando, mostra a bolinha girando. Se não, mostra a lista */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F97316" />
        </View>
      ) : (
        <FlatList
          data={tools} // <-- Aqui passamos a variável de estado 'tools' (que veio do banco)
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

              {/* TÍTULO DA SEÇÃO */}
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Perto de você</Text>
              </View>
            </>
          }
          // Caso o banco esteja vazio, mostra essa mensagem:
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum anúncio encontrado.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ToolCard
              item={item}
              onPress={() => navigate("toolDetails", { id: item.id })}
            />
          )}
        />
      )}

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#737373",
    fontSize: 16,
  },
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
