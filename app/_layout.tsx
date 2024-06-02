import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import * as StoreReview from "expo-store-review";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { ReviewRequestModal } from "../components/ReviewRequestModal";
import { getCountForStore } from "../utils/addCountForStore";
import {
  doneReviewRequest,
  isAlreadyReviewRequest,
} from "../utils/reviewRequest";
import { sleep } from "../utils/sleep";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <RecoilRoot>
        {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
        <RootLayoutNav />
      </RecoilRoot>
    </>
  );
}

function RootLayoutNav() {
  const [shouldReviewRequest, setShouldReviewRequest] = useState(false);

  useEffect(() => {
    (async () => {
      // ニョキッと出てきた感をだすために少し待つ
      await sleep(1000);

      const isAlreadyRequest = await isAlreadyReviewRequest();
      if (isAlreadyRequest) return;

      const count = await getCountForStore();
      if (count < 3) return;

      setShouldReviewRequest(true);
    })();
  }, []);

  return (
    <>
      <ThemeProvider value={DefaultTheme}>
        <ReviewRequestModal
          isOpen={shouldReviewRequest}
          onCancelPress={() => {
            setShouldReviewRequest(false);
          }}
          onReviewPress={async () => {
            const isAvailable = await StoreReview.isAvailableAsync();
            if (isAvailable) {
              await StoreReview.requestReview();
            }
            await doneReviewRequest();
            setShouldReviewRequest(false);
          }}
        />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" />
          <Stack.Screen name="result" />
        </Stack>
      </ThemeProvider>
    </>
  );
}
