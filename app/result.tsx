import { MaterialIcons, Octicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  Alert,
  Linking,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useRecoilValue } from "recoil";
import { ScannedUrlState } from "../atom/ScannedUrl";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

export default function ResultScreen() {
  const scannedUrl = useRecoilValue(ScannedUrlState);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingTop: 32,
        paddingLeft: 32,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: Colors.light.grey,
          marginBottom: 8,
        }}
      >
        読み取り内容
      </Text>
      <ActionItem
        containerStyle={{
          borderTopColor: Colors.light.lightGrey,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
        icon={
          <Octicons
            name="link-external"
            size={24}
            color={Colors.light.darkGrey}
          />
        }
        onPress={() => {
          (async () => {
            const canOpen = await Linking.canOpenURL(scannedUrl);
            if (canOpen) {
              await Linking.openURL(scannedUrl);
            }
          })();
        }}
        title={scannedUrl}
        titleColor={Colors.light.tint}
      />
      <Text
        style={{
          fontWeight: "bold",
          color: Colors.light.grey,
          marginTop: 32,
          marginBottom: 8,
        }}
      >
        アクション
      </Text>
      <ActionItem
        containerStyle={{
          borderTopColor: Colors.light.lightGrey,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
        icon={<Octicons name="copy" size={24} color={Colors.light.darkGrey} />}
        onPress={() => {
          (async () => {
            if (Platform.OS === "ios") {
              await Clipboard.setUrlAsync(scannedUrl);
              Alert.alert("コピーしました");
            }
            await Clipboard.setStringAsync(scannedUrl);
          })();
        }}
        title="コピーする"
      />
      <ActionItem
        icon={<Octicons name="share" size={24} color={Colors.light.darkGrey} />}
        onPress={() => {
          (async () => {
            try {
              await Share.share({
                message: scannedUrl,
              });
            } catch (error) {
              console.info(error);
            }
          })();
        }}
        title="共有する"
      />
    </View>
  );
}

const ActionItem = (props: {
  containerStyle?: ViewStyle;
  title: string;
  titleColor?: string;
  onPress: () => void;
  icon: React.ReactNode;
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[
      {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomColor: Colors.light.lightGrey,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      props.containerStyle,
    ]}
  >
    <View
      style={{
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.icon}
    </View>
    <Text
      style={{
        color: props.titleColor ?? Colors.light.darkGrey,
        fontSize: 16,
        marginLeft: 16,
      }}
    >
      {props.title}
    </Text>
    <MaterialIcons
      style={{
        marginLeft: "auto",
      }}
      name="arrow-forward-ios"
      size={24}
      color={Colors.light.lightGrey}
    />
  </TouchableOpacity>
);
