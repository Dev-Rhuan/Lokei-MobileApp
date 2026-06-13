import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../../services/supabase";
import { ProfileHeader } from "../../components/ProfileHeader";
import { MenuItem } from "../../components/MenuItem";
import { styles } from "./styles";

export const MinhaConta = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<any>();

  async function handleLogout() {
    Alert.alert("Sair da conta", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut();
          navigate("login");
        },
      },
    ]);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Título */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Minha conta</Text>
        </View>

        {/* Header do perfil */}
        <View style={styles.section}>
          <ProfileHeader />
        </View>

        {/* Atividade */}
        <Text style={styles.sectionLabel}>ATIVIDADE</Text>
        <View style={styles.menuCard}>
          <MenuItem
            icon="package"
            title="Meus anúncios"
            subtitle="Ferramentas que você disponibiliza"
            onPress={() => navigate("meusAnuncios")}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="key"
            title="Meus aluguéis"
            subtitle="Histórico e aluguéis em andamento"
            onPress={() => navigate("meusAlugueis")}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="user"
            iconColor="#6366F1"
            iconBg="#EEF2FF"
            title="Dados da conta"
            subtitle="Informações pessoais e documentos"
            onPress={() => {}}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Lokei · versão 1.0.0</Text>
      </ScrollView>
    </View>
  );
};
