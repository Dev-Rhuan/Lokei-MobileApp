import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  activeRoute: string;
};

export function BottomNavBar({ activeRoute }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Feather
          name="home"
          size={24}
          color={activeRoute == "home" ? "#F97316" : "#A3A3A3"}
        />
        <Text style={styles.text}>Início</Text>
      </TouchableOpacity>

      <View style={styles.centerButton}>
        <TouchableOpacity style={styles.anunciar}>
          <Feather name="plus" size={28} />
        </TouchableOpacity>
        <Text style={styles.text}>Anunciar</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Feather
          name="user"
          size={24}
          color={activeRoute == "home" ? "#F97316" : "#A3A3A3"}
        />
        <Text style={styles.text}>Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 70,
    paddingBottom: 10,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#737373",
  },
  centerButton: {
    marginTop: -28,
  },
  anunciar: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    backgroundColor: "#F67316",
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#ffff",
    shadowColor: "#F97316",
  },
});
