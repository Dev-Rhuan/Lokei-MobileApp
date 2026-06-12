import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, LocaleConfig } from "react-native-calendars";

import { supabase } from "../../services/supabase";

// Configuração do calendário
LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul.",
    "Ago",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

type ToolDetailProps = {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  cep: string;
  image: string;
};

// Função para calcular todos os dias entre duas datas
const getDatesInRange = (start: string, end: string) => {
  const dates = [];
  let curr = new Date(start + "T12:00:00Z");
  let stop = new Date(end + "T12:00:00Z");

  if (curr > stop) {
    const temp = curr;
    curr = stop;
    stop = temp;
  }

  while (curr <= stop) {
    dates.push(curr.toISOString().split("T")[0]);
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
};

export const ToolDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { id } = route.params as { id: string };

  const [tool, setTool] = useState<ToolDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados para o calendário (Início e Fim)
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  async function fetchToolDetails() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("anuncio")
        .select("id, titulo, descricao, preco, cep, anuncio_imagem ( url )")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        const imageUrl =
          data.anuncio_imagem?.[0]?.url ||
          "https://reactnative.dev/img/tiny_logo.png";
        setTool({
          id: data.id,
          titulo: data.titulo,
          descricao: data.descricao,
          preco: Number(data.preco),
          cep: data.cep,
          image: imageUrl,
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Não foi possível carregar os detalhes.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchToolDetails();
  }, [id]);

  // Lógica de cálculo dos valores
  const selectedRange =
    startDate && endDate
      ? getDatesInRange(startDate, endDate)
      : startDate
        ? [startDate]
        : [];
  const daysCount = selectedRange.length;

  const subtotal = tool ? tool.preco * daysCount : 0;
  const taxaServico = Math.round(subtotal * 0.12); // Exemplo: 12% de taxa de serviço
  const total = subtotal + taxaServico;

  // Gerando os dias marcados para o Calendário
  const markedDates: any = {};
  selectedRange.forEach((date) => {
    markedDates[date] = {
      selected: true,
      selectedColor: "#F97316",
      disableTouchEvent: true,
    };
  });

  if (loading || !tool) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* --- CABEÇALHO E IMAGEM PRINCIPAL --- */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: tool.image }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={[styles.topBar, { top: insets.top + 10 }]}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={24} color="#171717" />
            </TouchableOpacity>
            <View style={styles.topBarRight}>
              <TouchableOpacity style={styles.iconCircle}>
                <Feather name="heart" size={20} color="#171717" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle}>
                <Feather name="share-2" size={20} color="#171717" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- CONTEÚDO --- */}
        <View style={styles.content}>
          {/* Título e Preço */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>{tool.titulo}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceValue}>
                <Text style={styles.priceCurrency}>R$ </Text>
                {tool.preco.toFixed(0)}
              </Text>
              <Text style={styles.priceSuffix}>/dia</Text>
            </View>
          </View>

          {/* Localização */}
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={14} color="#F97316" />
            <Text style={styles.locationText}>{tool.cep} · 1,2 km de você</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={[styles.tagPill, { backgroundColor: "#FFF7ED" }]}>
              <Feather name="star" size={12} color="#F97316" />
              <Text style={[styles.tagText, { color: "#F97316" }]}>
                4.9 <Text style={{ color: "#A3A3A3" }}>(128)</Text>
              </Text>
            </View>
            <View style={[styles.tagPill, { backgroundColor: "#ECFDF5" }]}>
              <Feather name="shield" size={12} color="#10B981" />
              <Text style={[styles.tagText, { color: "#10B981" }]}>
                Verificado
              </Text>
            </View>
            <View style={[styles.tagPill, { backgroundColor: "#F3F4F6" }]}>
              <Feather name="clock" size={12} color="#737373" />
              <Text style={[styles.tagText, { color: "#737373" }]}>
                Responde rápido
              </Text>
            </View>
          </View>

          {/* Card do Dono */}
          <View style={styles.ownerCard}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.ownerAvatarText}>M</Text>
            </View>
            <View style={styles.ownerInfo}>
              <Text style={styles.ownerName}>Marcos Oliveira</Text>
              <Text style={styles.ownerStats}>
                47 aluguéis · Membro desde 2023
              </Text>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <Feather name="message-circle" size={20} color="#F97316" />
            </TouchableOpacity>
          </View>

          {/* Descrição */}
          <Text style={styles.sectionTitle}>Sobre a ferramenta</Text>
          <Text style={styles.description}>{tool.descricao}</Text>

          {/* Divisor */}
          <View style={styles.divider} />

          {/* --- SEÇÃO DO CALENDÁRIO --- */}
          <View style={styles.calendarHeaderRow}>
            <Text style={styles.sectionTitle}>Selecione os dias</Text>
            {daysCount > 0 && (
              <View style={styles.daysBadge}>
                <Text style={styles.daysBadgeText}>
                  {daysCount} dia{daysCount > 1 ? "s" : ""}
                </Text>
              </View>
            )}
          </View>

          <Calendar
            style={{ marginBottom: 24, borderRadius: 16 }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#A3A3A3",
              selectedDayBackgroundColor: "#F97316",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#F97316",
              dayTextColor: "#171717",
              textDisabledColor: "#D1D5DB",
              arrowColor: "#F97316",
              monthTextColor: "#171717",
              textDayFontWeight: "500",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "600",
              textDayFontSize: 16,
              textMonthFontSize: 18,
            }}
            onDayPress={(day: any) => {
              if (!startDate || (startDate && endDate)) {
                // Inicia uma nova seleção
                setStartDate(day.dateString);
                setEndDate(null);
              } else {
                // Finaliza a seleção (fecha o intervalo)
                setEndDate(day.dateString);
              }
            }}
            markedDates={markedDates}
            renderArrow={(direction: string) => (
              <View style={styles.arrowContainer}>
                <Feather
                  name={direction === "left" ? "chevron-left" : "chevron-right"}
                  size={18}
                  color="#F97316"
                />
              </View>
            )}
          />

          {/* Legenda do Calendário */}
          <View style={styles.calendarLegend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: "#F97316" }]}
              />
              <Text style={styles.legendText}>Selecionado</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: "#F3F4F6" }]}
              />
              <Text style={styles.legendText}>Indisponível</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {
                    borderWidth: 1,
                    borderColor: "#F97316",
                    backgroundColor: "transparent",
                  },
                ]}
              />
              <Text style={styles.legendText}>Hoje</Text>
            </View>
          </View>

          {/* --- CAIXA DE CÁLCULO (Aparece apenas quando há dias selecionados) --- */}
          {daysCount > 0 && (
            <View style={styles.receiptCard}>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptText}>
                  R$ {tool.preco.toFixed(0)}/dia × {daysCount} dia
                  {daysCount > 1 ? "s" : ""}
                </Text>
                <Text style={styles.receiptValue}>
                  R$ {subtotal.toFixed(0)}
                </Text>
              </View>
              <View style={[styles.receiptRow, styles.receiptBorder]}>
                <Text style={styles.receiptText}>Taxa de serviço</Text>
                <Text style={styles.receiptValue}>
                  R$ {taxaServico.toFixed(0)}
                </Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptTotalText}>Total</Text>
                <Text style={styles.receiptTotalValue}>
                  R$ {total.toFixed(0)}
                </Text>
              </View>
            </View>
          )}

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Feather
              name="info"
              size={16}
              color="#0284C7"
              style={{ marginTop: 2 }}
            />
            <Text style={styles.infoText}>
              O pagamento só é confirmado após o dono aceitar a solicitação.
              Você tem até 24h após o aluguel para reportar qualquer problema.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* --- BOTÃO FIXO INFERIOR --- */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            daysCount > 0
              ? { backgroundColor: "#F97316" }
              : { backgroundColor: "#D1D5DB" },
          ]}
          disabled={daysCount === 0}
          onPress={() => {
            Alert.alert(
              "Sucesso!",
              `Aluguel de ${daysCount} dias solicitado. Total: R$ ${total}`,
            );
          }}
        >
          <Text style={styles.actionButtonText}>
            {daysCount > 0 ? "Solicitar aluguel" : "Selecione as datas"}
          </Text>

          {daysCount > 0 && (
            <View style={styles.buttonPriceBadge}>
              <Text style={styles.buttonPriceText}>R$ {total.toFixed(0)}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Imagem e Cabeçalho
  imageWrapper: { width: "100%", height: 320, position: "relative" },
  mainImage: { width: "100%", height: "100%", backgroundColor: "#F5F5F5" },
  topBar: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBarRight: { flexDirection: "row", gap: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  content: { padding: 20, paddingTop: 16 },

  // Título e Preço
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#171717",
    marginRight: 16,
  },
  priceContainer: { alignItems: "flex-end" },
  priceValue: { fontSize: 28, fontWeight: "bold", color: "#F97316" },
  priceCurrency: { fontSize: 16 },
  priceSuffix: { fontSize: 12, color: "#A3A3A3", marginTop: -4 },

  // Info e Tags
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  locationText: { fontSize: 14, color: "#737373" },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  tagPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  tagText: { fontSize: 12, fontWeight: "600" },

  // Owner Card
  ownerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  ownerAvatarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  ownerInfo: { flex: 1 },
  ownerName: { fontSize: 16, fontWeight: "bold", color: "#171717" },
  ownerStats: { fontSize: 12, color: "#737373", marginTop: 2 },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },

  // Descrição
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#171717",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 8,
  },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 24 },

  // Calendário
  calendarHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  daysBadge: {
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  daysBadgeText: { color: "#F97316", fontWeight: "bold", fontSize: 14 },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarLegend: { flexDirection: "row", gap: 16, marginBottom: 24 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 12, color: "#737373" },

  // Receipt Card
  receiptCard: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  receiptBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#FDBA74",
    paddingBottom: 16,
    marginBottom: 16,
  },
  receiptText: { fontSize: 15, color: "#4B5563" },
  receiptValue: { fontSize: 15, color: "#171717", fontWeight: "600" },
  receiptTotalText: { fontSize: 18, fontWeight: "bold", color: "#171717" },
  receiptTotalValue: { fontSize: 20, fontWeight: "bold", color: "#F97316" },

  // Info Box
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F0F9FF",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  infoText: { flex: 1, fontSize: 13, color: "#0369A1", lineHeight: 20 },

  // Botão Fixo
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  actionButton: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  buttonPriceBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  buttonPriceText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
