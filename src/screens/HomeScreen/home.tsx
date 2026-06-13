import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Importando o Supabase e a tipagem do Card
import { supabase } from "../../services/supabase";
import { ToolCard, ToolProps } from "../../components/Card";
import { BottomNavBar } from "../../components/NavBar";

import { styles } from "./styles";

export const Home = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState("Todos");

  const [tools, setTools] = useState<ToolProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAnuncios() {
    try {
      setLoading(true);

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
        console.log("primeiro anuncio:", JSON.stringify(data[0]));
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

  useEffect(() => {
    fetchAnuncios();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F97316" />
        </View>
      ) : (
        <FlatList
          data={tools}
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
