import { MaterialIcons } from "@expo/vector-icons";
import {
  ViewStyle,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import Colors from "../constants/Colors";

export const ActionItem = (props: {
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
