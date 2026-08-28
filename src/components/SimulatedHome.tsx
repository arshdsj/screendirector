import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { SimulatedClock } from "@/models";

const apps = [
  ["📷", "Camera"],
  ["🗺️", "Maps"],
  ["🖼️", "Photos"],
  ["⛅", "Weather"],
  ["🗒️", "Notes"],
  ["🕒", "Clock"],
  ["📅", "Calendar"],
  ["⚙️", "Settings"],
  ["🎵", "Music"],
  ["📁", "Files"],
  ["◼️", "Utilities"],
];

export function SimulatedHome({
  clock,
  onDirectorPress,
  children,
}: PropsWithChildren<{ clock: SimulatedClock; onDirectorPress: () => void }>) {
  return (
    <View style={styles.root}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>{clock.time}</Text>
          <View style={styles.island} />
          <Text style={styles.statusIcons}>▮▮ ᯤ ▰</Text>
        </View>
        <View style={styles.dateBlock}>
          <Text style={styles.date}>{clock.dateLabel}</Text>
          <Text style={styles.largeTime}>{clock.time}</Text>
        </View>
        <View style={styles.grid}>
          {apps.map(([icon, label]) => (
            <View key={label} style={styles.app}>
              <View style={styles.icon}><Text style={styles.iconGlyph}>{icon}</Text></View>
              <Text style={styles.appLabel}>{label}</Text>
            </View>
          ))}
          <Pressable style={styles.app} onPress={onDirectorPress}>
            <View style={[styles.icon, styles.directorIcon]}>
              <Text style={styles.directorMark}>▶</Text>
            </View>
            <Text style={styles.appLabel}>Director</Text>
          </Pressable>
        </View>
        <View style={styles.dots}><Text style={styles.dotsText}>●  ○  ○</Text></View>
        <View style={styles.dock}>
          {[["☎️", "#48C867"], ["✉️", "#4BA4FF"], ["🧭", "#F4F4F4"], ["🎧", "#F45C77"]].map(([icon, color], index) => (
            <View key={index} style={[styles.dockIcon, { backgroundColor: color }]}><Text style={styles.dockGlyph}>{icon}</Text></View>
          ))}
        </View>
      </SafeAreaView>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#11162B", overflow: "hidden" },
  glowOne: { position: "absolute", width: 500, height: 500, borderRadius: 250, backgroundColor: "#553D91", top: -210, right: -220, opacity: 0.85 },
  glowTwo: { position: "absolute", width: 430, height: 430, borderRadius: 215, backgroundColor: "#0B6178", bottom: -180, left: -180, opacity: 0.78 },
  safe: { flex: 1 },
  statusBar: { height: 45, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24 },
  statusTime: { color: "white", fontSize: 14, fontWeight: "700", width: 74 },
  island: { width: 124, height: 34, borderRadius: 19, backgroundColor: "#030303" },
  statusIcons: { color: "white", fontSize: 11, fontWeight: "800", width: 74, textAlign: "right" },
  dateBlock: { alignItems: "center", marginTop: 12, marginBottom: 22 },
  date: { color: "rgba(255,255,255,0.76)", fontSize: 13, fontWeight: "600" },
  largeTime: { color: "white", fontSize: 38, fontWeight: "300", letterSpacing: -1.5 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 18, rowGap: 22 },
  app: { width: "25%", alignItems: "center", gap: 4 },
  icon: { width: 57, height: 57, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center" },
  iconGlyph: { fontSize: 29 },
  appLabel: { color: "white", fontSize: 11, fontWeight: "500", textShadowColor: "rgba(0,0,0,0.45)", textShadowRadius: 3 },
  directorIcon: { backgroundColor: "#6C4CF1" },
  directorMark: { color: "white", fontSize: 23, marginLeft: 3 },
  dots: { flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 12 },
  dotsText: { color: "rgba(255,255,255,0.72)", fontSize: 9, letterSpacing: 3 },
  dock: { height: 88, marginHorizontal: 13, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.22)", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" },
  dockIcon: { width: 58, height: 58, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  dockGlyph: { fontSize: 29 },
});

