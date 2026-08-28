import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme";
import type { CallProp, SimulatedClock } from "@/models";

function CircleAction({
  color,
  icon,
  label,
  onPress,
}: {
  color: string;
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.actionWrap}>
      <Pressable onPress={onPress} style={[styles.action, { backgroundColor: color }]}>
        <Text style={styles.actionIcon}>{icon}</Text>
      </Pressable>
      <Text style={styles.actionLabel}>{label}</Text>
    </View>
  );
}

export function CallPresentation({
  call,
  clock,
  accepted,
  onAccept,
  onEnd,
}: {
  call: CallProp;
  clock: SimulatedClock;
  accepted: boolean;
  onAccept: () => void;
  onEnd: () => void;
}) {
  const active = call.direction === "outgoing" || accepted;
  return (
    <View style={styles.root}>
      <View style={styles.status}>
        <Text style={styles.statusTime}>{clock.time}</Text>
        <View style={styles.island} />
        <Text style={styles.statusIcons}>▮▮ ᯤ ▰</Text>
      </View>
      <View style={styles.identity}>
        {call.avatar ? (
          <Image source={{ uri: call.avatar.localUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}><Text style={styles.avatarLetter}>{(call.callerName || "?")[0].toUpperCase()}</Text></View>
        )}
        <Text style={styles.callState}>{active ? "calling…" : "mobile"}</Text>
        <Text style={styles.name}>{call.callerName || "Unknown"}</Text>
      </View>
      {active ? (
        <View style={styles.activeArea}>
          <View style={styles.tools}>
            {["mute", "keypad", "speaker", "add call", "FaceTime", "contacts"].map((tool, index) => (
              <View key={tool} style={styles.tool}>
                <View style={styles.toolCircle}><Text style={styles.toolIcon}>{["◒", "⠿", "◖", "+", "▣", "◉"][index]}</Text></View>
                <Text style={styles.toolText}>{tool}</Text>
              </View>
            ))}
          </View>
          <CircleAction color={colors.danger} icon="⌕" label="end" onPress={onEnd} />
        </View>
      ) : (
        <View style={styles.incomingActions}>
          <CircleAction color={colors.danger} icon="⌕" label="Decline" onPress={onEnd} />
          <CircleAction color={colors.success} icon="☎" label="Accept" onPress={onAccept} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "#151517", paddingTop: 7, paddingBottom: 44 },
  status: { height: 45, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24 },
  statusTime: { color: "white", fontSize: 14, fontWeight: "700", width: 74 },
  island: { width: 124, height: 34, borderRadius: 19, backgroundColor: "#030303" },
  statusIcons: { color: "white", fontSize: 11, fontWeight: "800", width: 74, textAlign: "right" },
  identity: { alignItems: "center", paddingTop: 52 },
  avatar: { width: 112, height: 112, borderRadius: 56, marginBottom: 22 },
  avatarFallback: { width: 112, height: 112, borderRadius: 56, marginBottom: 22, backgroundColor: "#35353A", alignItems: "center", justifyContent: "center" },
  avatarLetter: { color: "#E5E5E8", fontSize: 48, fontWeight: "300" },
  callState: { color: "#B4B4B8", fontSize: 15, marginBottom: 5 },
  name: { color: "white", fontSize: 34, fontWeight: "500", textAlign: "center", paddingHorizontal: 24 },
  incomingActions: { marginTop: "auto", flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 36 },
  actionWrap: { alignItems: "center", gap: 8 },
  action: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center" },
  actionIcon: { color: "white", fontSize: 29, fontWeight: "700", transform: [{ rotate: "-10deg" }] },
  actionLabel: { color: "white", fontSize: 13 },
  activeArea: { flex: 1, justifyContent: "flex-end", alignItems: "center", gap: 48 },
  tools: { width: 290, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 25 },
  tool: { width: 82, alignItems: "center", gap: 6 },
  toolCircle: { width: 66, height: 66, borderRadius: 33, backgroundColor: "#333336", alignItems: "center", justifyContent: "center" },
  toolIcon: { color: "white", fontSize: 25 },
  toolText: { color: "#E0E0E3", fontSize: 12 },
});
