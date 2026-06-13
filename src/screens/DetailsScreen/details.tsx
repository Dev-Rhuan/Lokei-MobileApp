import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../services/supabase";
import { RentalCalendar, getDatesInRange } from "../../components/Calender";

import { styles } from "./styles";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/button";
import { UserCard } from "../../components/UserCard";

type ToolDetailProps = {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  cep: string;
  image: string;
  usuario_id: string;
};

type OwnerProps = {
  name: string;
  memberSince: string;
};

export const ToolDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { id } = route.params as { id: string };

  const [tool, setTool] = useState<ToolDetailProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [owner, setOwner] = useState<OwnerProps | null>(null);

  async function fetchToolDetails() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("anuncio")
        .select(
          `
    id, titulo, descricao, preco, cep,
    usuario_id,
    anuncio_imagem ( url ),
    usuario ( name, created_at )
  `,
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setTool({
          id: data.id,
          titulo: data.titulo,
          descricao: data.descricao,
          preco: Number(data.preco),
          cep: data.cep,
          image:
            data.anuncio_imagem?.[0]?.url ??
            "https://reactnative.dev/img/tiny_logo.png",
          usuario_id: data.usuario_id,
        });
        const u = data.usuario as any;
        setOwner({
          name: u?.name ?? "Usuário",
          memberSince: u?.created_at
            ? new Date(u.created_at).getFullYear().toString()
            : "—",
        });
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchToolDetails();
  }, [id]);

  function handleDayPress(day: any) {
    const tapped = day.dateString;
    if (!startDate) {
      setStartDate(tapped);
      setEndDate(null);
      return;
    }

    if (startDate && !endDate) {
      if (tapped === startDate) {
        setStartDate(null);
        return;
      }
      if (tapped < startDate) {
        setStartDate(tapped);
        setEndDate(null);
        return;
      }
      setEndDate(tapped);
      return;
    }

    if (startDate && endDate) {
      if (tapped < startDate) {
        setStartDate(tapped);
        setEndDate(null);
        return;
      }
      if (tapped > endDate) {
        setEndDate(tapped);
        return;
      }
      setStartDate(tapped);
      setEndDate(null);
    }
  }

  async function handleSolicitarAluguel() {
    if (!startDate || !endDate) {
      Alert.alert("Atenção", "Selecione as datas do aluguel.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert("Sessão expirada", "Faça login novamente.");
      return;
    }

    // bloqueia o dono de alugar a própria ferramenta
    if (user.id === tool!.usuario_id) {
      Alert.alert("Atenção", "Você não pode alugar sua própria ferramenta.");
      return;
    }

    try {
      const { error } = await supabase.from("aluguel").insert({
        anuncio_id: tool!.id,
        locatario_id: user.id,
        locador_id: tool!.usuario_id,
        data_inicio: startDate,
        data_fim: endDate,
        total: total,
        status: "EM_APROVACAO",
      });

      if (error) throw error;

      Alert.alert(
        "Solicitação enviada!",
        "O dono da ferramenta será notificado.",
        [{ text: "OK", onPress: () => navigation.goBack() }],
      );
    } catch (e) {
      console.error("Erro ao solicitar aluguel:", JSON.stringify(e));
      Alert.alert(
        "Erro",
        "Não foi possível solicitar o aluguel. Tente novamente.",
      );
    }
  }

  const selectedRange =
    startDate && endDate
      ? getDatesInRange(startDate, endDate)
      : startDate
        ? [startDate]
        : [];

  const daysCount = selectedRange.length;
  const subtotal = tool ? tool.preco * daysCount : 0;
  const taxaServico = Math.round(subtotal * 0.12);
  const total = subtotal + taxaServico;

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
        {/* Imagem principal */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: tool.image }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={[styles.topBar, { top: insets.top + 10 }]}>
            <BackButton />
          </View>
        </View>

        <View style={styles.content}>
          {/* Título e preço */}
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

          {owner && (
            <UserCard
              name={owner.name}
              rentals={0}
              memberSince={owner.memberSince}
              cep={tool.cep}
            />
          )}

          {/* Descrição */}
          <Text style={styles.sectionTitle}>Sobre a ferramenta</Text>
          <Text style={styles.description}>{tool.descricao}</Text>

          <View style={styles.divider} />

          {/* Calendário */}
          <RentalCalendar
            startDate={startDate}
            endDate={endDate}
            onDayPress={handleDayPress}
            daysCount={daysCount}
            minDate={new Date().toISOString().split("T")[0]}
          />

          {/* Resumo financeiro */}
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
        </View>
      </ScrollView>

      {/* Botão fixo */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <Button
          title={daysCount > 0 ? "Solicitar aluguel" : "Selecione as datas"}
          onPress={handleSolicitarAluguel}
          disabled={daysCount === 0}
        />
      </View>
    </View>
  );
};
