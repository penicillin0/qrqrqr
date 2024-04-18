import { AntDesign } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { i18n } from "../utils/i18n";

type ReviewRequestModalProps = {
  isOpen: boolean;
  onCancelPress: () => void;
  onReviewPress: () => void;
};

const ICON_SIZE = 120;

export const ReviewRequestModal = ({
  isOpen,
  onCancelPress,
  onReviewPress,
}: ReviewRequestModalProps) => {
  return (
    <Modal isVisible={isOpen} style={{ justifyContent: "flex-end", margin: 0 }}>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          paddingBottom: 48,
          borderRadius: 40,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          {i18n.t("あなたの評価が\nアプリの力になります！")}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 16 }}>
          {i18n.t("5つ星レビューをお願いします！")}
        </Text>
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <Image
            source={require("../assets/images/icon.png")}
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              // borderColor: theme.colors.grey3,
              borderColor: "grey",
            }}
            borderRadius={12}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
            marginBottom: 24,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <AntDesign color="#FFC107" key={i} name="star" size={24} />
          ))}
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 24 }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onCancelPress()}
            style={{
              borderWidth: 2,
              borderColor: "#FFC107",
              borderRadius: 12,
              padding: 8,
              width: 144,
              paddingVertical: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {i18n.t("キャンセル")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onReviewPress()}
            style={{
              backgroundColor: "#FFC107",
              borderWidth: 2,
              borderColor: "#FFC107",
              borderRadius: 12,
              padding: 8,
              width: 144,
              paddingVertical: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {/* 5つ星 */}
              {i18n.t("5つ星")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
