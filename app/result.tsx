import { MaterialIcons, Octicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  Alert,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRecoilValue } from "recoil";
import { ScannedUrlState } from "../atom/ScannedUrl";
import Colors from "../constants/Colors";
import { i18n } from "../utils/i18n";
import { ActionItem } from "../components/ActionItem";

export default function ResultScreen() {
  const scannedUrl = useRecoilValue(ScannedUrlState);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingTop: 32,
        paddingLeft: 32,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: Colors.light.grey,
          marginBottom: 8,
        }}
      >
        {i18n.t("読み取り内容")}
      </Text>
      <ActionItem
        containerStyle={{
          borderTopColor: Colors.light.lightGrey,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
        icon={
          <Octicons
            name="link-external"
            size={24}
            color={Colors.light.darkGrey}
          />
        }
        onPress={() => {
          (async () => {
            const canOpen = await Linking.canOpenURL(scannedUrl);
            if (canOpen) {
              await Linking.openURL(scannedUrl);
            }
          })();
        }}
        title={scannedUrl}
        titleColor={Colors.light.tint}
      />
      <Text
        style={{
          fontWeight: "bold",
          color: Colors.light.grey,
          marginTop: 32,
          marginBottom: 8,
        }}
      >
        {i18n.t("アクション")}
      </Text>
      <ActionItem
        containerStyle={{
          borderTopColor: Colors.light.lightGrey,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
        icon={<Octicons name="copy" size={24} color={Colors.light.darkGrey} />}
        onPress={() => {
          (async () => {
            if (Platform.OS === "ios") {
              await Clipboard.setUrlAsync(scannedUrl);
              Alert.alert(i18n.t("コピーしました"));
            }
            await Clipboard.setStringAsync(scannedUrl);
          })();
        }}
        title={i18n.t("コピーする")}
      />
      <ActionItem
        icon={<Octicons name="share" size={24} color={Colors.light.darkGrey} />}
        onPress={() => {
          (async () => {
            try {
              await Share.share({
                message: scannedUrl,
              });
            } catch (error) {
              console.info(error);
            }
          })();
        }}
        title={i18n.t("共有する")}
      />
    </View>
  );
}
