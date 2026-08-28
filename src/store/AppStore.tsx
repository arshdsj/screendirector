import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  addMessageToHistory,
  deleteHistoryEntry,
  deletePreset,
  upsertPreset,
} from "@/lib/data";
import type {
  CallProp,
  PersistedAppState,
  PlaybackEvent,
  Preset,
  SimulatedClock,
  TextMessageProp,
} from "@/models";

const STORAGE_KEY = "@screendirector/app-state-v1";

const initialState: PersistedAppState = {
  clock: { dateLabel: "Friday, August 28", time: "9:41" },
  callPresets: [
    {
      id: "unknown",
      name: "Unknown Caller",
      value: { callerName: "Unknown", direction: "incoming", delaySeconds: 3, ringtoneEnabled: true },
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "scam",
      name: "Scam Likely",
      value: { callerName: "Scam Likely", direction: "incoming", delaySeconds: 3, ringtoneEnabled: true },
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "blocked",
      name: "Blocked Caller",
      value: { callerName: "Blocked", direction: "incoming", delaySeconds: 3, ringtoneEnabled: false },
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
  ],
  textPresets: [],
  messageHistory: [],
};

type AppStoreValue = PersistedAppState & {
  hydrated: boolean;
  playbackEvent?: PlaybackEvent;
  setClock: (clock: SimulatedClock) => void;
  saveCallPreset: (name: string, value: CallProp) => void;
  saveTextPreset: (name: string, value: TextMessageProp) => void;
  removeCallPreset: (id: string) => void;
  removeTextPreset: (id: string) => void;
  rememberMessage: (message: string) => void;
  removeHistoryEntry: (message: string) => void;
  beginPlayback: (event: PlaybackEvent) => void;
  clearPlayback: () => void;
};

const AppStoreContext = createContext<AppStoreValue | undefined>(undefined);

export function AppStoreProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [playbackEvent, setPlaybackEvent] = useState<PlaybackEvent>();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) setState({ ...initialState, ...(JSON.parse(stored) as PersistedAppState) });
      })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const update = useCallback((recipe: (current: PersistedAppState) => PersistedAppState) => {
    setState((current) => recipe(current));
  }, []);

  const value = useMemo<AppStoreValue>(
    () => ({
      ...state,
      hydrated,
      playbackEvent,
      setClock: (clock) => update((current) => ({ ...current, clock })),
      saveCallPreset: (name, presetValue) =>
        update((current) => ({
          ...current,
          callPresets: upsertPreset(current.callPresets, name, presetValue),
        })),
      saveTextPreset: (name, presetValue) =>
        update((current) => ({
          ...current,
          textPresets: upsertPreset(current.textPresets, name, presetValue),
        })),
      removeCallPreset: (id) =>
        update((current) => ({ ...current, callPresets: deletePreset(current.callPresets, id) })),
      removeTextPreset: (id) =>
        update((current) => ({ ...current, textPresets: deletePreset(current.textPresets, id) })),
      rememberMessage: (message) =>
        update((current) => ({
          ...current,
          messageHistory: addMessageToHistory(current.messageHistory, message),
        })),
      removeHistoryEntry: (message) =>
        update((current) => ({
          ...current,
          messageHistory: deleteHistoryEntry(current.messageHistory, message),
        })),
      beginPlayback: setPlaybackEvent,
      clearPlayback: () => setPlaybackEvent(undefined),
    }),
    [hydrated, playbackEvent, state, update],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error("useAppStore must be used inside AppStoreProvider");
  return store;
}

export type { Preset };

