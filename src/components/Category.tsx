import { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCategories } from "../hooks/useCategories";

type Props = {
  activeCategoryId: string | null; // <-- Mudamos para esperar o ID
  onSelect: (categoryId: string) => void;
};

export function Category({ activeCategoryId, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const { categories, loading } = useCategories();

  // Encontra o nome da categoria selecionada para exibir no botão
  const selectedCategoryName = useMemo(() => {
    if (!activeCategoryId || !categories) return null;
    const category = categories.find((c) => c.id === activeCategoryId);
    return category?.nome || null;
  }, [activeCategoryId, categories]);

  function handleSelect(id: string) {
    onSelect(id);
    setOpen(false);
  }

  return (
    <View>
      {/* Campo que abre o dropdown */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.selectorText,
            !selectedCategoryName && styles.placeholder,
          ]}
        >
          {selectedCategoryName ?? "Selecione uma categoria"}
        </Text>
        <Feather name="chevron-down" size={18} color="#A3A3A3" />
      </TouchableOpacity>

      {/* Modal com lista */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.dropdown}>
            {loading ? (
              <ActivityIndicator color="#F97316" style={{ padding: 20 }} />
            ) : (
              <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  // Agora checamos o ID em vez do nome
                  const isActive = activeCategoryId === item.id;

                  return (
                    <TouchableOpacity
                      style={[styles.option, isActive && styles.optionActive]}
                      onPress={() => handleSelect(item.id)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isActive && styles.optionTextActive,
                        ]}
                      >
                        {item.nome}
                      </Text>
                      {isActive && (
                        <Feather name="check" size={16} color="#F97316" />
                      )}
                    </TouchableOpacity>
                  );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    height: 60,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#A3A3A3",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectorText: {
    fontSize: 16,
    color: "#171717",
  },
  placeholder: {
    color: "#A3A3A3",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 20,
    maxHeight: 400,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionActive: {
    backgroundColor: "#FFF7ED",
  },
  optionText: {
    fontSize: 15,
    color: "#171717",
  },
  optionTextActive: {
    color: "#F97316",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#F5F5F5",
    marginHorizontal: 16,
  },
});
