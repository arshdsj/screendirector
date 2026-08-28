import { Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import type { TextMessageProp } from "@/models";

export function TextNotification({ text, onDismiss }: { text: TextMessageProp; onDismiss: () => void }) {
  const swipe = Gesture.Pan()
    .runOnJS(true)
    .onEnd((event) => {
      if (event.translationY < -28 || Math.abs(event.translationX) > 85) onDismiss();
    });

  return (
    <GestureDetector gesture={swipe}>
      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.appBadge}><Text style={styles.appGlyph}>●</Text></View>
          <Text style={styles.appName}>MESSAGES</Text>
          <Text style={styles.now}>now</Text>
        </View>
        <View style={styles.bodyRow}>
          {text.avatar ? (
            <Image source={{ uri: text.avatar.localUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}><Text style={styles.avatarText}>{(text.senderName || "?")[0].toUpperCase()}</Text></View>
          )}
          <View style={styles.copy}>
            <Text style={styles.sender} numberOfLines={1}>{text.senderName || "Unknown"}</Text>
            <Text style={styles.message} numberOfLines={3}>{text.message}</Text>
          </View>
          {text.attachment ? <Image source={{ uri: text.attachment.localUri }} style={styles.attachment} /> : null}
        </View>
        <View style={styles.handle} />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: { position: "absolute", top: 59, left: 9, right: 9, borderRadius: 24, backgroundColor: "rgba(246,246,249,0.96)", paddingHorizontal: 15, paddingTop: 13, paddingBottom: 12, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 9 },
  appBadge: { width: 20, height: 20, borderRadius: 5, backgroundColor: "#35C759", alignItems: "center", justifyContent: "center", marginRight: 7 },
  appGlyph: { color: "white", fontSize: 10 },
  appName: { color: "#777780", fontSize: 12, fontWeight: "700", letterSpacing: 0.2, flex: 1 },
  now: { color: "#8A8A91", fontSize: 12 },
  bodyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  avatarFallback: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#B8BAC1", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "white", fontSize: 19, fontWeight: "600" },
  copy: { flex: 1 },
  sender: { color: "#111116", fontSize: 15, fontWeight: "700", marginBottom: 2 },
  message: { color: "#29292E", fontSize: 14, lineHeight: 18 },
  attachment: { width: 48, height: 48, borderRadius: 9 },
  handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: "#B8B8BE", alignSelf: "center", marginTop: 10 },
});

