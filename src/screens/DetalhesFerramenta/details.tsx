import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ToolDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Captura o ID que passamos via parâmetro lá na Home
  const { id } = route.params as { id: string };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Botão de Voltar */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="#171717" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Detalhes da Ferramenta</Text>
        <Text style={styles.subtitle}>ID selecionado: {id}</Text>
        
        {/* Futuramente você vai buscar no banco de dados os detalhes dessa ferramenta usando esse ID */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  backButton: {
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#171717",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#737373",
  },
});