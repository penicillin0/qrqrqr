import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSetRecoilState } from "recoil";
import { ScannedUrlState } from "../../atom/ScannedUrl";
import Colors from "../../constants/Colors";
import { UrlHistory, deleteHistory, loadHistory } from "../../utils/storage";
import { i18n } from "../../utils/i18n";

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
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
      }}
    >
      <SwipeListView
        data={histories}
        keyExtractor={(item) => item.timestamp.toString()}
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
              <View style={{ backgroundColor: "transparent" }}>
                <Text style={{ color: Colors.light.darkGrey }}>{item.url}</Text>
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
  );
}
