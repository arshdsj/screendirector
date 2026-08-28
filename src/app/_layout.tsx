import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppStoreProvider } from "@/store/AppStore";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppStoreProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="call" />
          <Stack.Screen name="text-message" />
          <Stack.Screen name="playback" options={{ gestureEnabled: false, animation: "none" }} />
        </Stack>
      </AppStoreProvider>
    </GestureHandlerRootView>
  );
}

