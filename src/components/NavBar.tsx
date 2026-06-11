import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";

type BottomNavBarProps = {
  bottomInset: number;
};

export const BottomNavBar = ({ bottomInset }: BottomNavBarProps) => {
  const { navigate } = useNavigation();

  const handleAnunciarPress = () => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    navigate("Anunciar" as never);
  };

  return (
    <View style={[styles.bottomBar, { paddingBottom: bottomInset || 16 }]}>
      <TouchableOpacity style={styles.tabItem}>
        <Feather name="home" size={24} color="#F97316" />
        <Text style={[styles.tabLabel, { color: "#F97316" }]}>Início</Text>
      </TouchableOpacity>

      <View style={styles.centerTabWrapper}>
        <TouchableOpacity
          style={styles.floatingBtn}
          activeOpacity={0.9}
          onPress={handleAnunciarPress}
        >
          <Feather name="plus" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.tabLabel}>Anunciar</Text>
      </View>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigate("Conta" as never)}
      >
        <Feather name="user" size={24} color="#A3A3A3" />
        <Text style={styles.tabLabel}>Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabItem: { alignItems: "center", justifyContent: "center", flex: 1 },
  tabLabel: { fontSize: 12, marginTop: 4, color: "#A3A3A3", fontWeight: "500" },
  centerTabWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  floatingBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#F97316",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -45,
    borderWidth: 4,
    borderColor: "#F9FAFB",
    elevation: 8,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
