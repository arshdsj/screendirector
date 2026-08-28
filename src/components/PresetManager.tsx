import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/theme";
import type { Preset } from "@/models";
import { Field, MiniButton } from "@/components/FormControls";

export function PresetManager<T>({
  presets,
  presetName,
  onPresetNameChange,
  onLoad,
  onSave,
  onDelete,
}: {
  presets: Preset<T>[];
  presetName: string;
  onPresetNameChange: (name: string) => void;
  onLoad: (preset: Preset<T>) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.saveRow}>
        <View style={styles.nameField}>
          <Field label="Preset name" value={presetName} onChangeText={onPresetNameChange} placeholder="e.g. Detective call" />
        </View>
        <View style={styles.saveButton}><MiniButton label="Save" onPress={onSave} /></View>
      </View>
      {presets.length ? (
        <View style={styles.list}>
          {presets.map((preset) => (
            <View key={preset.id} style={styles.presetRow}>
              <Pressable style={styles.presetName} onPress={() => onLoad(preset)}>
                <Text style={styles.presetText}>{preset.name}</Text>
                <Text style={styles.presetHint}>Load editable copy</Text>
              </Pressable>
              <MiniButton label="Delete" destructive onPress={() => onDelete(preset.id)} />
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.empty}>No saved presets yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 14 },
  saveRow: { flexDirection: "row", alignItems: "flex-end", gap: 10 },
  nameField: { flex: 1 },
  saveButton: { paddingBottom: 4 },
  list: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
  presetRow: { flexDirection: "row", alignItems: "center", paddingVertical: 11, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line, gap: 10 },
  presetName: { flex: 1 },
  presetText: { color: colors.ink, fontWeight: "700", fontSize: 15 },
  presetHint: { color: colors.muted, fontSize: 11, marginTop: 2 },
  empty: { color: colors.muted, fontSize: 13 },
});

