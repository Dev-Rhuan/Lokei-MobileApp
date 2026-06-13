import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../services/supabase";

type ProfileData = {
  name: string;
  email: string;
  totalAnuncios: number;
  totalAlugueis: number;
};

export function ProfileHeader() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const [usuarioRes, anunciosRes, alugueisRes] = await Promise.all([
          supabase
            .from("usuario")
            .select("name, email")
            .eq("id", user.id)
            .single(),
          supabase
            .from("anuncio")
            .select("id", { count: "exact" })
            .eq("usuario_id", user.id),
          supabase
            .from("aluguel")
            .select("id", { count: "exact" })
            .eq("locatario_id", user.id),
        ]);

        setProfile({
          name: usuarioRes.data?.name ?? "Usuário",
          email: usuarioRes.data?.email ?? "",
          totalAnuncios: anunciosRes.count ?? 0,
          totalAlugueis: alugueisRes.count ?? 0,
        });
      } catch (e) {
        console.error("Erro ao buscar perfil:", JSON.stringify(e));
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#F97316" />
      </View>
    );
  }

  if (!profile) return null;

  const initial = profile.name.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      {/* Avatar + info */}
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profile.totalAnuncios}</Text>
          <Text style={styles.statLabel}>Anúncios</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profile.totalAlugueis}</Text>
          <Text style={styles.statLabel}>Aluguéis</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 24,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: "#737373",
    marginBottom: 6,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#F5F5F5",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#737373",
  },
});
