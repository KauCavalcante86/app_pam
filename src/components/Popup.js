import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Popup({
  visible,
  title,
  message,
  onClose,
  type = "error",
}) {
  const color =
    type === "success"
      ? "#22C55E"
      : type === "warning"
      ? "#F59E0B"
      : "#EF4444";

  const icon =
    type === "success"
      ? "check"
      : type === "warning"
      ? "warning"
      : "close";

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
        }}
      >
        <View
          style={{
            width: "88%",
            backgroundColor: "#FFF",
            borderRadius: 22,
            overflow: "hidden",
            elevation: 8,
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingTop: 28,
              paddingHorizontal: 25,
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: color,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <MaterialIcons
                name={icon}
                size={30}
                color="#FFF"
              />
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#222",
                textAlign: "center",
              }}
            >
              {title}
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginBottom: 28,
                color: "#888",
                fontSize: 15,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              {message}
            </Text>
          </View>

          <Pressable
            onPress={onClose}
            style={{
              borderTopWidth: 1,
              borderTopColor: "#ECECEC",
              paddingVertical: 18,
            }}
          >
            <Text
              style={{
                color: "#007AFF",
                fontSize: 18,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}