import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSetRecoilState } from "recoil";
import { ScannedUrlState } from "../../atom/ScannedUrl";
import Colors from "../../constants/Colors";
import { i18n } from "../../utils/i18n";
import {
  UrlHistory,
  clearHistory,
  deleteHistory,
  loadHistory,
} from "../../utils/storage";

export default function HistoryScreen() {
  const [histories, setHistories] = useState<UrlHistory[]>([]);
  const setScannedUrl = useSetRecoilState(ScannedUrlState);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const histories = (await loadHistory()).sort(
        (a, b) => b.timestamp - a.timestamp
      );
      setHistories(histories);
    })();
  }, [isFocused]);

  return (
    <>
      <StatusBar style="dark" />
      <Tabs.Screen
        options={{
          title: i18n.t("履歴"),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16, padding: 4 }}
              activeOpacity={0.6}
              onPress={() => {
                Alert.alert(
                  i18n.t("削除"),
                  i18n.t("全ての履歴を削除しますか？"),
                  [
                    {
                      text: i18n.t("キャンセル"),
                      style: "cancel",
                    },
                    {
                      text: i18n.t("削除"),
                      onPress: async () => {
                        await clearHistory();
                        setHistories([]);
                      },
                    },
                  ]
                );
              }}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color={Colors.light.grey}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.light.background,
        }}
      >
        <SwipeListView
          data={histories}
          keyExtractor={(item) => item.timestamp.toString() + item.url}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                setScannedUrl(item.url);
                router.push("/result");
              }}
              underlayColor="#DDDDDD"
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors.light.background,
                padding: 16,
              }}
            >
              <>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: Colors.light.darkGrey }}
                    numberOfLines={1}
                  >
                    {item.url}
                  </Text>
                  <Text style={{ fontSize: 12, color: Colors.light.grey }}>
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>
                <MaterialIcons
                  style={{ marginLeft: "auto" }}
                  name="arrow-forward-ios"
                  size={20}
                  color={Colors.light.lightGrey}
                />
              </>
            </TouchableHighlight>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: Colors.light.lightGrey,
                height: StyleSheet.hairlineWidth,
              }}
            />
          )}
          renderHiddenItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                deleteHistory({
                  timestamp: item.timestamp,
                  url: item.url,
                });
                setHistories(
                  histories.filter((h) => h.timestamp !== item.timestamp)
                );
              }}
              style={{
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "flex-end",
                padding: 16,
                height: "100%",
              }}
            >
              <Text
                style={{ color: Colors.light.background, fontWeight: "bold" }}
              >
                {i18n.t("削除")}
              </Text>
            </TouchableOpacity>
          )}
          rightOpenValue={-64}
        />
      </View>
    </>
  );
}
