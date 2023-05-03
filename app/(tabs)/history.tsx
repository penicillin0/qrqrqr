import { StyleSheet, TouchableOpacity } from "react-native";

import { useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { UrlHistory, loadHistory } from "../../utils/storage";

export default function HistoryScreen() {
  const [histories, setHistories] = useState<UrlHistory[]>([]);
  const handleOnPress = async () => {
    const histories = await loadHistory();
    setHistories(histories);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <TouchableOpacity onPress={handleOnPress}>
        <Text> load</Text>
      </TouchableOpacity>
      {histories.map((history) => (
        <View
          key={history.timestamp}
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            {history.url}
          </Text>
          <Text
            style={{
              color: "white",
            }}
          >
            {new Date(history.timestamp).toLocaleString()}
          </Text>
        </View>
      ))}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/history.tsx" />
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
