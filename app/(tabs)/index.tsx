import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import * as StoreReview from "expo-store-review";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useSetRecoilState } from "recoil";
import { ScannedUrlState } from "../../atom/ScannedUrl";
import { Text, View } from "../../components/Themed";
import { addCountForStore } from "../../utils/addCountForStore";
import { saveHistory } from "../../utils/storage";

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const setScannedUrl = useSetRecoilState(ScannedUrlState);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScannedUrl(data);
    const count = await addCountForStore();
    Alert.alert(count.toString());

    if (count > 10 && count % 25 === 0) {
      const isAvailable = await StoreReview.isAvailableAsync();
      if (isAvailable) {
        await StoreReview.requestReview();
      }
    }

    await saveHistory({
      url: data,
      timestamp: Date.now(),
    });
    router.push("/result");
  };

  if (!isFocused) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          marginTop: 12,
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "white",
          }}
        >
          QRコードを配置を配置してください
        </Text>
      </View>
    </View>
  );
}
