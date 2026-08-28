import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { EditorShell } from "@/components/EditorShell";
import { Field, FormSection, MediaPickerRow, MiniButton, PrimaryButton } from "@/components/FormControls";
import { PresetManager } from "@/components/PresetManager";
import { createId } from "@/lib/data";
import { importLocalImage } from "@/lib/media";
import { colors } from "@/lib/theme";
import type { Preset, TextMessageProp } from "@/models";
import { useAppStore } from "@/store/AppStore";

const emptyText: TextMessageProp = {
  senderName: "",
  message: "",
  delaySeconds: 3,
};

export default function TextEditor() {
  const {
    textPresets,
    messageHistory,
    saveTextPreset,
    removeTextPreset,
    rememberMessage,
    removeHistoryEntry,
    beginPlayback,
  } = useAppStore();
  const [text, setText] = useState(emptyText);
  const [presetName, setPresetName] = useState("");
  const patch = (value: Partial<TextMessageProp>) => setText((current) => ({ ...current, ...value }));

  const start = () => {
    if (!text.message.trim()) {
      Alert.alert("Add a message", "The notification needs a message body.");
      return;
    }
    rememberMessage(text.message);
    beginPlayback({ id: createId(), kind: "text", payload: text });
    router.push("/playback");
  };
  const load = (preset: Preset<TextMessageProp>) => {
    setText({ ...preset.value });
    setPresetName(preset.name);
  };
  const save = () => {
    if (!presetName.trim()) {
      Alert.alert("Name this preset", "Enter a name before saving.");
      return;
    }
    saveTextPreset(presetName, text);
  };

  return (
    <EditorShell title="Text message" subtitle="Deliver one notification. Swipe it away when the take is done.">
      <FormSection title="MESSAGE">
        <Field
          label="Sender"
          value={text.senderName}
          onChangeText={(senderName) => patch({ senderName })}
          placeholder="Sender name"
          autoCapitalize="words"
        />
        <MediaPickerRow
          label="Sender photo"
          asset={text.avatar}
          onPick={() => void importLocalImage().then((avatar) => avatar && patch({ avatar }))}
          onClear={() => patch({ avatar: undefined })}
        />
        <Field
          label="Message body"
          value={text.message}
          onChangeText={(message) => patch({ message })}
          placeholder="Type the notification text"
          multiline
          maxLength={500}
        />
        <MediaPickerRow
          label="Attachment"
          asset={text.attachment}
          onPick={() => void importLocalImage().then((attachment) => attachment && patch({ attachment }))}
          onClear={() => patch({ attachment: undefined })}
        />
        <Field
          label="Hidden delay (seconds)"
          value={String(text.delaySeconds)}
          onChangeText={(value) => patch({ delaySeconds: Math.min(120, Math.max(0, Number(value.replace(/[^0-9]/g, "")) || 0)) })}
          keyboardType="number-pad"
        />
      </FormSection>

      {messageHistory.length ? (
        <FormSection title="PREVIOUS MESSAGES">
          {messageHistory.map((message) => (
            <View key={message} style={styles.historyRow}>
              <Pressable style={styles.historyCopy} onPress={() => patch({ message })}>
                <Text numberOfLines={2} style={styles.historyText}>{message}</Text>
                <Text style={styles.historyHint}>Tap to reuse</Text>
              </Pressable>
              <MiniButton label="Delete" destructive onPress={() => removeHistoryEntry(message)} />
            </View>
          ))}
        </FormSection>
      ) : null}

      <PrimaryButton label="Start event" onPress={start} />

      <FormSection title="PRESETS">
        <PresetManager
          presets={textPresets}
          presetName={presetName}
          onPresetNameChange={setPresetName}
          onLoad={load}
          onSave={save}
          onDelete={removeTextPreset}
        />
      </FormSection>
    </EditorShell>
  );
}

const styles = StyleSheet.create({
  historyRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingBottom: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  historyCopy: { flex: 1 },
  historyText: { color: colors.ink, fontSize: 14, lineHeight: 18, fontWeight: "600" },
  historyHint: { color: colors.muted, fontSize: 11, marginTop: 3 },
});

