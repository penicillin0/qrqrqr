import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import * as StoreReview from "expo-store-review";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { ScannedUrlState } from "../../atom/ScannedUrl";
import { addCountForStore } from "../../utils/addCountForStore";
import { i18n } from "../../utils/i18n";
import { saveHistory } from "../../utils/storage";

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedUrl, setScannedUrl] = useRecoilState(ScannedUrlState);

  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    setScannedUrl("");

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scannedUrl) return;

    setScannedUrl(data);
    const count = await addCountForStore();

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

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{i18n.t("設定からカメラの使用を許可してください")}</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          justifyContent: "center",
          position: "absolute",
          height: "100%",
          backgroundColor: "transparent",
        }}
      >
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={128}
          color={"rgba(255,255,255,0.5)"}
        />
      </View>
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
        <Text style={{ fontSize: 16, color: "white" }}>
          {i18n.t("QRコードを配置を配置してください")}
        </Text>
      </View>
    </View>
  );
}
