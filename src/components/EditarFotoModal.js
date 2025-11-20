import React, { useState } from "react";
import { View, Text, Modal, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function EditarFotoModal({ visible, onClose, onSave }) {
  const [preview, setPreview] = useState(null); // foto escolhida

  const abrirGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setPreview(base64);
    }
  };

  const salvarFoto = async () => {
  if (!preview) return;

  await onSave(preview); // ⬅ espera salvar no backend
  setPreview(null);
  onClose(); // ⬅ só fecha quando TERMINADO
};


  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#FFF",
            padding: 20,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
            Alterar Foto de Perfil
          </Text>

          {/* PREVIEW DA FOTO */}
          {preview ? (
            <Image
              source={{ uri: preview }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                marginBottom: 15,
              }}
            />
          ) : (
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                backgroundColor: "#E0E0E0",
                marginBottom: 15,
              }}
            />
          )}

          {/* BOTÃO ESCOLHER FOTO */}
          <Pressable
            onPress={abrirGaleria}
            style={{
              backgroundColor: "#1E88E5",
              padding: 12,
              borderRadius: 10,
              width: "100%",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16 }}>Escolher da Galeria</Text>
          </Pressable>

          {/* BOTÃO SALVAR */}
          <Pressable
            disabled={!preview}
            onPress={salvarFoto}
            style={{
              backgroundColor: preview ? "#43A047" : "#9E9E9E",
              padding: 12,
              borderRadius: 10,
              width: "100%",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16 }}>Salvar</Text>
          </Pressable>

          {/* BOTÃO CANCELAR */}
          <Pressable
            onPress={() => {
              setPreview(null);
              onClose();
            }}
            style={{
              backgroundColor: "#BDBDBD",
              padding: 12,
              borderRadius: 10,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16 }}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
