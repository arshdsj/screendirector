import type { PropsWithChildren } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { colors } from "@/lib/theme";
import type { MediaAsset } from "@/models";

export function FormSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.section}>{children}</View>
    </View>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor="#9A9CA5"
        selectionColor={colors.accent}
        style={[styles.input, props.multiline && styles.multiline, props.style]}
      />
    </View>
  );
}

export function ChoiceRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.choiceRow}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[styles.choice, selected && styles.choiceSelected]}
            >
              <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function SwitchRow({
  label,
  detail,
  value,
  onValueChange,
}: {
  label: string;
  detail?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.switchRow}>
      <View style={styles.switchCopy}>
        <Text style={styles.switchLabel}>{label}</Text>
        {detail ? <Text style={styles.switchDetail}>{detail}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D3D3D7", true: colors.accent }}
      />
    </View>
  );
}

export function MediaPickerRow({
  label,
  asset,
  onPick,
  onClear,
}: {
  label: string;
  asset?: MediaAsset;
  onPick: () => void;
  onClear: () => void;
}) {
  return (
    <View style={styles.mediaRow}>
      {asset ? (
        <Image source={{ uri: asset.localUri }} style={styles.thumbnail} />
      ) : (
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.thumbnailIcon}>＋</Text>
        </View>
      )}
      <View style={styles.mediaCopy}>
        <Text style={styles.switchLabel}>{label}</Text>
        <Text style={styles.switchDetail} numberOfLines={1}>
          {asset?.fileName ?? "No photo selected"}
        </Text>
      </View>
      <Pressable onPress={asset ? onClear : onPick} hitSlop={8}>
        <Text style={asset ? styles.removeText : styles.actionText}>{asset ? "Remove" : "Choose"}</Text>
      </Pressable>
    </View>
  );
}

export function PrimaryButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.primary, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={styles.primaryText}>{label}</Text>
      <Text style={styles.primaryArrow}>→</Text>
    </Pressable>
  );
}

export function MiniButton({
  label,
  onPress,
  destructive,
}: {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={styles.miniButton}>
      <Text style={[styles.miniText, destructive && styles.destructive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionWrap: { marginTop: 14 },
  sectionTitle: { color: colors.muted, fontSize: 12, fontWeight: "700", letterSpacing: 1.2, marginLeft: 4, marginBottom: 8 },
  section: { backgroundColor: colors.surface, borderRadius: 18, padding: 15, gap: 15, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.line },
  field: { gap: 7 },
  label: { color: colors.ink, fontSize: 14, fontWeight: "700" },
  input: { backgroundColor: "#F3F2EF", borderRadius: 12, minHeight: 48, paddingHorizontal: 13, color: colors.ink, fontSize: 16 },
  multiline: { minHeight: 100, paddingTop: 12, textAlignVertical: "top" },
  choiceRow: { flexDirection: "row", backgroundColor: "#EFEEEB", borderRadius: 12, padding: 3 },
  choice: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: 9 },
  choiceSelected: { backgroundColor: colors.surface, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  choiceText: { color: colors.muted, fontSize: 14, fontWeight: "600" },
  choiceTextSelected: { color: colors.ink },
  switchRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  switchCopy: { flex: 1 },
  switchLabel: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  switchDetail: { color: colors.muted, fontSize: 12, marginTop: 3 },
  mediaRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  thumbnail: { width: 52, height: 52, borderRadius: 14, backgroundColor: "#EEE" },
  thumbnailPlaceholder: { width: 52, height: 52, borderRadius: 14, backgroundColor: colors.accentSoft, alignItems: "center", justifyContent: "center" },
  thumbnailIcon: { color: colors.accent, fontSize: 26, fontWeight: "300" },
  mediaCopy: { flex: 1 },
  actionText: { color: colors.accent, fontWeight: "700" },
  removeText: { color: colors.danger, fontWeight: "700" },
  primary: { minHeight: 58, borderRadius: 18, marginTop: 22, paddingHorizontal: 19, backgroundColor: colors.ink, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.4 },
  primaryText: { color: "white", fontSize: 17, fontWeight: "800" },
  primaryArrow: { color: "white", fontSize: 24 },
  miniButton: { borderRadius: 10, backgroundColor: "#F1F0ED", paddingHorizontal: 12, paddingVertical: 9 },
  miniText: { color: colors.accent, fontSize: 13, fontWeight: "700" },
  destructive: { color: colors.danger },
});

