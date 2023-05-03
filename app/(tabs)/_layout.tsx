import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { Alert, Pressable } from "react-native";

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import { useSetRecoilState } from "recoil";
import { ScannedUrlState } from "../../atom/ScannedUrl";
import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = "light";
  const setScannedUrl = useSetRecoilState(ScannedUrlState);
  const router = useRouter();
  const pickImage = async () => {
    console.log("pickImage");

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      Alert.alert("画像を選択してください。");
      return;
    }

    const imageUri = result.assets[0].uri;
    const barCodeUrl = (await BarCodeScanner.scanFromURLAsync(imageUri))[0]
      .data;
    setScannedUrl(barCodeUrl);
    router.push("/result");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "読み取り",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={color}
            />
          ),
          headerRight: () => (
            <Pressable onPress={pickImage}>
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
        name="two"
        options={{
          title: "履歴",
          tabBarIcon: ({ color }) => (
            <Entypo name="text-document" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
