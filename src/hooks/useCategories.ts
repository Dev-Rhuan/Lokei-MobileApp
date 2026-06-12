import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Category = { id: string; nome: string };

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, error } = await supabase
          .from("categorias")
          .select("id, nome")
          .order("nome");
        if (error) throw error;
        setCategories(data ?? []);
      } catch (e) {
        console.error("Erro ao buscar categorias:", JSON.stringify(e));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { categories, loading };
}
