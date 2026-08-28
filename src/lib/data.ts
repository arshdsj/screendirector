import type { Preset } from "@/models";

export const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export function upsertPreset<T>(
  presets: Preset<T>[],
  name: string,
  value: T,
  now = new Date().toISOString(),
): Preset<T>[] {
  const normalizedName = name.trim();
  const existing = presets.find(
    (preset) => preset.name.toLocaleLowerCase() === normalizedName.toLocaleLowerCase(),
  );

  if (existing) {
    return presets.map((preset) =>
      preset.id === existing.id
        ? { ...preset, name: normalizedName, value, updatedAt: now }
        : preset,
    );
  }

  return [
    ...presets,
    {
      id: createId(),
      name: normalizedName,
      value,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export const deletePreset = <T>(presets: Preset<T>[], id: string) =>
  presets.filter((preset) => preset.id !== id);

export function addMessageToHistory(history: string[], message: string): string[] {
  const normalized = message.trim();
  if (!normalized) return history;
  return [normalized, ...history.filter((entry) => entry !== normalized)].slice(0, 50);
}

export const deleteHistoryEntry = (history: string[], message: string) =>
  history.filter((entry) => entry !== message);

