import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSetRecoilState } from "recoil";
import { ScannedUrlState } from "../../atom/ScannedUrl";
import { View } from "../../components/Themed";
import { saveHistory } from "../../utils/storage";

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const setScannedUrl = useSetRecoilState(ScannedUrlState);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScannedUrl(data);
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
    </View>
  );
}
