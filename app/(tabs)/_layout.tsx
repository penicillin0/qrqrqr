import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { Alert, Pressable } from "react-native";

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import { useSetRecoilState } from "recoil";
import { ScannedUrlState } from "../../atom/ScannedUrl";
import Colors from "../../constants/Colors";
import { addCountForStore } from "../../utils/addCountForStore";
import { i18n } from "../../utils/i18n";
import { saveHistory } from "../../utils/storage";

export default function TabLayout() {
  const colorScheme = "light";
  const setScannedUrl = useSetRecoilState(ScannedUrlState);
  const router = useRouter();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      Alert.alert(i18n.t("画像を選択してください"));
      return;
    }

    const imageUri = result.assets[0].uri;
    // TODO: BarCodeScannerが非推奨なので、代替手段を探す
    const barCodeUrl = (await BarCodeScanner.scanFromURLAsync(imageUri))[0]
      .data;
    setScannedUrl(barCodeUrl);
    await addCountForStore();
    await saveHistory({
      url: barCodeUrl,
      timestamp: Date.now(),
    });
    router.push("/result");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: { height: 82 },
        tabBarLabelStyle: { fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t("読み取り"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={color}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={pickImage}
              style={{ marginRight: 2, padding: 2 }}
            >
              {({ pressed }) => (
                <FontAwesome
                  name="photo"
                  size={24}
                  color="black"
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: i18n.t("履歴"),
          tabBarIcon: ({ color }) => (
            <Entypo name="text-document" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
