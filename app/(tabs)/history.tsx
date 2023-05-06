import { FlatList, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { UrlHistory, loadHistory } from "../../utils/storage";

export default function HistoryScreen() {
  const [histories, setHistories] = useState<UrlHistory[]>([]);

  useEffect(() => {
    (async () => {
      const histories = await loadHistory();
      setHistories(histories);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
      }}
    >
      <FlatList
        data={histories}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.light.background,
              padding: 16,
            }}
          >
            <View
              style={{
                backgroundColor: "transparent",
              }}
            >
              <Text
                style={{
                  color: Colors.light.darkGrey,
                }}
              >
                {item.url}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.light.grey,
                }}
              >
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
            <MaterialIcons
              style={{
                marginLeft: "auto",
              }}
              name="arrow-forward-ios"
              size={20}
              color={Colors.light.lightGrey}
            />
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: Colors.light.lightGrey,
              height: StyleSheet.hairlineWidth,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
