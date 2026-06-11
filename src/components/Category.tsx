import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

type Category = {
  id: string;
  nome: string;
};

type Props = {
  activeCategory: string | null;
  onSelect: (category: string) => void;
};

export function Category({ activeCategory, onSelect }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "categorias"));

    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          nome: doc.data().nome as string,
        }));
        setCategories(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator color="#F97316" style={{ margin: 16 }} />;
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const isActive = activeCategory === item.nome;
        return (
          <TouchableOpacity
            onPress={() => onSelect(item.nome)}
            style={[styles.pill, isActive && styles.pillActive]}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingHorizontal: 16,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
  },
  pillActive: {
    backgroundColor: "#F97316",
  },
  text: {
    fontSize: 14,
    color: "#737373",
    fontWeight: "500",
  },
  textActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
