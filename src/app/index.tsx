import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/lib/theme";
import { useAppStore } from "@/store/AppStore";

const categories = [
  { title: "Call", detail: "Incoming or outgoing", icon: "☎", route: "/call", color: "#E95C52" },
  { title: "Text Message", detail: "Single notification", icon: "●", route: "/text-message", color: "#36B86B" },
  { title: "Conversation", detail: "Coming soon", icon: "•••", color: "#4D8DE8" },
  { title: "Green Screen", detail: "Coming soon", icon: "◫", color: "#7961E8" },
] as const;

export default function StudioScreen() {
  const { clock, setClock } = useAppStore();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.kicker}>SCREEN DIRECTOR</Text>
        <Text style={styles.title}>Build the moment.</Text>
        <Text style={styles.subtitle}>Choose a prop, set the details, then hand the screen to your actor.</Text>

        <View style={styles.clockCard}>
          <View style={styles.clockCopy}>
            <Text style={styles.clockLabel}>SIMULATED CLOCK</Text>
            <Text style={styles.clockDetail}>Fixed during every take</Text>
          </View>
          <TextInput
            accessibilityLabel="Simulated date"
            value={clock.dateLabel}
            onChangeText={(dateLabel) => setClock({ ...clock, dateLabel })}
            style={[styles.clockInput, styles.dateInput]}
          />
          <TextInput
            accessibilityLabel="Simulated time"
            value={clock.time}
            onChangeText={(time) => setClock({ ...clock, time })}
            style={styles.clockInput}
          />
        </View>

        <View style={styles.grid}>
          {categories.map((category) => {
            const enabled = "route" in category;
            return (
              <Pressable
                key={category.title}
                disabled={!enabled}
                onPress={() => enabled && router.push(category.route)}
                style={({ pressed }) => [styles.card, !enabled && styles.cardDisabled, pressed && styles.pressed]}
              >
                <View style={[styles.cardIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.cardGlyph}>{category.icon}</Text>
                </View>
                <Text style={styles.cardTitle}>{category.title}</Text>
                <Text style={styles.cardDetail}>{category.detail}</Text>
                {enabled ? <Text style={styles.arrow}>↗</Text> : <Text style={styles.soon}>SOON</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
  kicker: { color: colors.accent, fontSize: 12, fontWeight: "900", letterSpacing: 2 },
  title: { color: colors.ink, fontSize: 38, lineHeight: 44, fontWeight: "900", marginTop: 7, letterSpacing: -1.2 },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 23, marginTop: 7, maxWidth: 340 },
  clockCard: { backgroundColor: colors.ink, borderRadius: 20, marginTop: 24, padding: 15, flexDirection: "row", alignItems: "center", gap: 8 },
  clockCopy: { flex: 1 },
  clockLabel: { color: "#BFB4FF", fontWeight: "800", fontSize: 10, letterSpacing: 1.1 },
  clockDetail: { color: "#D1D1D6", fontSize: 11, marginTop: 3 },
  clockInput: { backgroundColor: "#292B34", color: "white", borderRadius: 10, height: 38, paddingHorizontal: 10, fontWeight: "700", minWidth: 58, textAlign: "center" },
  dateInput: { width: 112, fontSize: 11 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 20 },
  card: { width: "48.3%", minHeight: 175, borderRadius: 22, backgroundColor: colors.surface, padding: 15, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.line },
  cardDisabled: { opacity: 0.55 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.98 }] },
  cardIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  cardGlyph: { color: "white", fontWeight: "800", fontSize: 22 },
  cardTitle: { color: colors.ink, fontSize: 17, fontWeight: "800", marginTop: 16 },
  cardDetail: { color: colors.muted, fontSize: 12, marginTop: 4 },
  arrow: { position: "absolute", right: 15, bottom: 12, color: colors.accent, fontSize: 24 },
  soon: { position: "absolute", right: 13, bottom: 15, color: colors.muted, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
});

