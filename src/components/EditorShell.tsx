import type { PropsWithChildren, ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { colors } from "@/lib/theme";

type Props = PropsWithChildren<{
  title: string;
  subtitle: string;
  trailing?: ReactNode;
}>;

export function EditorShell({ title, subtitle, trailing, children }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.nav}>
          <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.back}>‹ Studio</Text>
          </Pressable>
          {trailing}
        </View>
        <Text style={styles.eyebrow}>PROP EDITOR</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {children}
        <Text style={styles.credit}>Developed by Arsh DSJ</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 36 },
  nav: {
    minHeight: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: { color: colors.accent, fontSize: 17, fontWeight: "600" },
  eyebrow: { color: colors.accent, fontWeight: "800", fontSize: 12, letterSpacing: 1.7 },
  title: { color: colors.ink, fontSize: 36, lineHeight: 42, fontWeight: "800", marginTop: 5 },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 23, marginTop: 6, marginBottom: 22 },
  credit: { color: "#A09D96", textAlign: "center", fontSize: 12, marginTop: 32 },
});

