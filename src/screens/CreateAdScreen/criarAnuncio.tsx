import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "../../components/BackButton";
import { useState } from "react";
import { Category } from "../../components/Category";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { PhotoPicker } from "../../components/PhotoPicker";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { supabase } from "../../services/supabase";

export const CriarAnuncio = () => {
  type AnuncioProps = {
    titulo: string;
    descricao: string;
    preco: string;
    cep: string;
  };

  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AnuncioProps>();

  async function handlePublish(data: AnuncioProps) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        return;
      }

      const { data: anuncioInserido, error: anuncioError } = await supabase
        .from("anuncio")
        .insert({
          titulo: data.titulo,
          descricao: data.descricao,
          preco: parseFloat(data.preco.replace(",", ".")),
          cep: data.cep,
          categoria_id: activeCategory,
          usuario_id: user.id,
        })
        .select()
        .single();

      if (anuncioError) throw anuncioError;

      if (photoUrls.length > 0) {
        const imagensParaInserir = photoUrls.map((url, index) => ({
          anuncio_id: anuncioInserido.id,
          url: url,
          ordem: index,
        }));

        const { error: imagemError } = await supabase
          .from("anuncio_imagem")
          .insert(imagensParaInserir);

        if (imagemError) throw imagemError;
      }

      Alert.alert("Sucesso!", "Seu anúncio foi publicado com sucesso.", [
        { text: "OK", onPress: () => navigation.navigate("home") },
      ]);
    } catch (e) {
      console.error("Erro ao publicar anúncio:", JSON.stringify(e));
      Alert.alert(
        "Erro",
        "Não foi possível publicar o anúncio. Tente novamente.",
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <BackButton onPress={() => navigation.navigate("home")} />
          <Text style={styles.headerTitle}>Novo anúncio</Text>
          <TouchableOpacity onPress={() => navigation.navigate("home")}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 20 }}>
            <PhotoPicker onChange={setPhotoUrls} />
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Título do anúncio</Text>
            <Input
              error={errors.titulo?.message}
              formProps={{
                control,
                name: "titulo",
                rules: { required: "Título é obrigatório." },
              }}
              inputProps={{
                returnKeyType: "next",
              }}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Categoria</Text>
            <Category
              activeCategoryId={activeCategory}
              onSelect={setActiveCategory}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.hint}>0/500</Text>
            </View>
            <Input
              error={errors.descricao?.message}
              formProps={{
                control,
                name: "descricao",
                rules: { required: "Descrição é obrigatória." },
              }}
              inputProps={{
                placeholder:
                  "Descreva o estado, acessórios inclusos e instruções de uso...",
                multiline: true,
                returnKeyType: "default",
                textAlignVertical: "top",
              }}
              containerStyle={{
                height: 110,
                alignItems: "flex-start",
                paddingVertical: 14,
              }}
            />
          </View>

          <View style={styles.section}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Preço por dia</Text>
              <Input
                error={errors.preco?.message}
                formProps={{
                  control,
                  name: "preco",
                  rules: { required: "Preço é obrigatório." },
                }}
                inputProps={{
                  placeholder: "R$ 0,00",
                  keyboardType: "numeric",
                  returnKeyType: "next",
                }}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>CEP da localização</Text>
            <Input
              icon="map-pin"
              error={errors.cep?.message}
              formProps={{
                control,
                name: "cep",
                rules: {
                  required: "CEP é obrigatório.",
                },
              }}
              inputProps={{
                placeholder: "00000-000",
                keyboardType: "numeric",
                returnKeyType: "done",
              }}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
          <Button
            title="Publicar anúncio"
            onPress={handleSubmit(handlePublish)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
