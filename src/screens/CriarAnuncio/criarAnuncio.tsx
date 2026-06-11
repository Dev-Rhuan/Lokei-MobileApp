import {
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AnuncioProps>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 8,
          }}
        >
          <View>
            <BackButton />
            <Text>Novo anúncio</Text>
            <TouchableOpacity>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>

          <View>
            <PhotoPicker onChange={setPhotoUrls} />
          </View>

          <View>
            <Text>Título do anúncio</Text>
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

          <View>
            <Text>Categoria</Text>
            <Category
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </View>

          <View>
            <Text>Descrição</Text>
            <Input
              error={errors.descricao?.message}
              formProps={{
                control,
                name: "descricao",
                rules: { required: "Descrição é obrigatório." },
              }}
              inputProps={{
                placeholder:
                  "Descreva o estado, acessórios inclusos e instruções de uso da ferramenta...",
                multiline: true,
                numberOfLines: 5,
                returnKeyType: "default",
              }}
              containerStyle={{
                height: 100,
                paddingHorizontal: 0,
              }}
            />
          </View>

          <View>
            <Text>Valor do aluguel</Text>
            <Input
              error={errors.preco?.message}
              formProps={{
                control,
                name: "preco",
                rules: { required: "Preço é obrigatório." },
              }}
              inputProps={{
                placeholder: "0,00",
                returnKeyType: "next",
              }}
              containerStyle={{
                paddingHorizontal: 0,
              }}
            />
          </View>

          <View>
            <Text>Cep da localização do anuncio</Text>
            <Input
              error={errors.cep?.message}
              formProps={{
                control,
                name: "cep",
                rules: { required: "Cep é obrigatório." },
              }}
              inputProps={{
                returnKeyType: "next",
              }}
              containerStyle={{
                paddingHorizontal: 0,
              }}
            />
          </View>

          <View>
            <Button title="Publicar anúncio" />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
