import { Button, StyleSheet } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ScannedUrlState } from "../../atom/ScannedUrl";
import { View } from "../../components/Themed";

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const setScannedUrl = useSetRecoilState(ScannedUrlState);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setScannedUrl(data);
    router.push("/result");
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
