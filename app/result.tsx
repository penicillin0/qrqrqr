import { useRecoilValue } from "recoil";
import { ScannedUrlState } from "../atom/ScannedUrl";
import { Text, View } from "../components/Themed";

export default function ResultScreen() {
  const scannedUrl = useRecoilValue(ScannedUrlState);

  return (
    <View>
      <Text>{scannedUrl}</Text>
    </View>
  );
}
