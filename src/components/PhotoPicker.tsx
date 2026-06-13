import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../services/supabase";

const MAX_PHOTOS = 5;

type Props = {
  onChange: (urls: string[]) => void;
};

type Photo = {
  localUri: string;
  remoteUrl?: string;
};

export function PhotoPicker({ onChange }: Props) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);

  async function handlePickImage() {
    if (photos.length >= MAX_PHOTOS) return;

    Alert.alert("Adicionar foto", "Escolha uma opção", [
      {
        text: "Tirar foto",
        onPress: () => openCamera(),
      },
      {
        text: "Escolher da galeria",
        onPress: () => openGallery(),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  }

  async function openCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão negada", "Precisamos de acesso à câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      await uploadImages(result.assets);
    }
  }

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: MAX_PHOTOS - photos.length,
      quality: 0.7,
    });

    if (!result.canceled) {
      await uploadImages(result.assets);
    }
  }

  async function uploadImages(assets: ImagePicker.ImagePickerAsset[]) {
    setUploading(true);

    try {
      const uploaded: Photo[] = [];

      for (const asset of assets) {
        const response = await fetch(asset.uri);
        const arrayBuffer = await response.arrayBuffer();

        const fileName = `${Date.now()}_${Math.random()}.jpg`;

        const { error } = await supabase.storage
          .from("anuncios")
          .upload(fileName, arrayBuffer, { contentType: "image/jpeg" });

        if (error) throw error;

        const { data } = supabase.storage
          .from("anuncios")
          .getPublicUrl(fileName);

        uploaded.push({ localUri: asset.uri, remoteUrl: data.publicUrl });
      }
      const updated = [...photos, ...uploaded];
      setPhotos(updated);
      onChange(updated.map((p) => p.remoteUrl!));
    } catch (e) {
      console.error("Erro no upload:", JSON.stringify(e));
      Alert.alert("Erro", "Não foi possível fazer o upload das fotos.");
    } finally {
      setUploading(false);
    }
  }

  function handleRemove(index: number) {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    onChange(updated.map((p) => p.remoteUrl!));
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.label}>Fotos da ferramenta</Text>
        <Text style={styles.counter}>
          {photos.length}/{MAX_PHOTOS}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {/* Botão adicionar */}
          {photos.length < MAX_PHOTOS && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handlePickImage}
              disabled={uploading}
            >
              <Feather name="camera" size={24} color="#F97316" />
              <Text style={styles.addText}>
                {uploading ? "Enviando..." : "Adicionar"}
              </Text>
            </TouchableOpacity>
          )}

          {photos.map((photo, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image source={{ uri: photo.localUri }} style={styles.photo} />
              {index === 0 && <Text style={styles.coverTag}>Capa</Text>}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(index)}
              >
                <Feather name="x" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#737373",
    fontWeight: "400",
  },
  counter: {
    fontSize: 14,
    color: "#A3A3A3",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  addButton: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#F97316",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  addText: {
    fontSize: 12,
    color: "#F97316",
    fontWeight: "500",
  },
  photoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: "visible",
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  coverTag: {
    position: "absolute",
    bottom: 6,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 2,
  },
  removeButton: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#171717",
    justifyContent: "center",
    alignItems: "center",
  },
});
