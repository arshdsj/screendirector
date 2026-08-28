import { router } from "expo-router";
import { Alert } from "react-native";
import { useState } from "react";

import { EditorShell } from "@/components/EditorShell";
import {
  ChoiceRow,
  Field,
  FormSection,
  MediaPickerRow,
  PrimaryButton,
  SwitchRow,
} from "@/components/FormControls";
import { PresetManager } from "@/components/PresetManager";
import { createId } from "@/lib/data";
import { importLocalImage } from "@/lib/media";
import type { CallProp, Preset } from "@/models";
import { useAppStore } from "@/store/AppStore";

const emptyCall: CallProp = {
  callerName: "",
  direction: "incoming",
  delaySeconds: 3,
  ringtoneEnabled: true,
};

export default function CallEditor() {
  const { callPresets, saveCallPreset, removeCallPreset, beginPlayback } = useAppStore();
  const [call, setCall] = useState(emptyCall);
  const [presetName, setPresetName] = useState("");

  const patch = (value: Partial<CallProp>) => setCall((current) => ({ ...current, ...value }));
  const start = () => {
    beginPlayback({ id: createId(), kind: "call", payload: call });
    router.push("/playback");
  };
  const load = (preset: Preset<CallProp>) => {
    setCall({ ...preset.value });
    setPresetName(preset.name);
  };
  const save = () => {
    if (!presetName.trim()) {
      Alert.alert("Name this preset", "Enter a name before saving.");
      return;
    }
    saveCallPreset(presetName, call);
  };

  return (
    <EditorShell title="Phone call" subtitle="Stage one believable call after a hidden delay.">
      <FormSection title="CALLER">
        <Field
          label="Caller name"
          value={call.callerName}
          onChangeText={(callerName) => patch({ callerName })}
          placeholder="Leave empty for Unknown"
          autoCapitalize="words"
        />
        <MediaPickerRow
          label="Caller photo"
          asset={call.avatar}
          onPick={() => void importLocalImage().then((avatar) => avatar && patch({ avatar }))}
          onClear={() => patch({ avatar: undefined })}
        />
      </FormSection>

      <FormSection title="TIMING & BEHAVIOR">
        <ChoiceRow
          label="Call type"
          value={call.direction}
          options={[{ label: "Incoming", value: "incoming" }, { label: "Outgoing", value: "outgoing" }]}
          onChange={(direction) => patch({ direction })}
        />
        <Field
          label="Hidden delay (seconds)"
          value={String(call.delaySeconds)}
          onChangeText={(value) => patch({ delaySeconds: Math.min(120, Math.max(0, Number(value.replace(/[^0-9]/g, "")) || 0)) })}
          keyboardType="number-pad"
        />
        <SwitchRow
          label="Play local ringtone"
          detail="Loops only while an incoming call is ringing"
          value={call.ringtoneEnabled}
          onValueChange={(ringtoneEnabled) => patch({ ringtoneEnabled })}
        />
      </FormSection>

      <PrimaryButton label="Start event" onPress={start} />

      <FormSection title="PRESETS">
        <PresetManager
          presets={callPresets}
          presetName={presetName}
          onPresetNameChange={setPresetName}
          onLoad={load}
          onSave={save}
          onDelete={removeCallPreset}
        />
      </FormSection>
    </EditorShell>
  );
}

