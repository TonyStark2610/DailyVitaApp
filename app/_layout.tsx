import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="HealthConcernsScreen" />
          <Stack.Screen name="DietSelectionScreen" />
          <Stack.Screen name="AllergiesScreen" />
          <Stack.Screen name="FinalScreen" />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
