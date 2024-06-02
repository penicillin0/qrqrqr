import { Entypo, Octicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Stack, router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Alert,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState } from "recoil";
import { ScannedUrlState } from "../atom/ScannedUrl";
import { ActionItem } from "../components/ActionItem";
import Colors from "../constants/Colors";
import { i18n } from "../utils/i18n";

export default function ResultScreen() {
  const [scannedUrl, setScannedUrl] = useRecoilState(ScannedUrlState);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "POP") {
        setScannedUrl("");
      }
    });
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerBackTitle: i18n.t("戻る"),
          title: i18n.t("読み取り結果"),
          headerBackButtonMenuEnabled: false,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setScannedUrl("");
                  router.back();
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingVertical: 8,
                  paddingRight: 8,
                  marginLeft: -4,
                }}
              >
                <Entypo
                  name="chevron-thin-left"
                  size={16}
                  color={Colors.light.darkGrey}
                />
                <Text
                  style={{
                    color: Colors.light.darkGrey,
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  戻る
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <View
        style={{
          flex: 1,
          borderTopColor: Colors.light.lightGrey,
          borderTopWidth: StyleSheet.hairlineWidth,
          backgroundColor: Colors.light.background,
          paddingTop: 32,
          paddingLeft: 20,
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
          icon={
            <Octicons name="copy" size={24} color={Colors.light.darkGrey} />
          }
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
          icon={
            <Octicons name="share" size={24} color={Colors.light.darkGrey} />
          }
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
    </>
  );
}
