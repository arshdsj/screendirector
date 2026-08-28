export type SimulatedClock = {
  dateLabel: string;
  time: string;
};

export type MediaAsset = {
  id: string;
  localUri: string;
  fileName: string;
  mediaType: "image";
};

export type CallProp = {
  callerName: string;
  avatar?: MediaAsset;
  direction: "incoming" | "outgoing";
  delaySeconds: number;
  ringtoneEnabled: boolean;
};

export type TextMessageProp = {
  senderName: string;
  avatar?: MediaAsset;
  message: string;
  attachment?: MediaAsset;
  delaySeconds: number;
};

export type Preset<T> = {
  id: string;
  name: string;
  value: T;
  createdAt: string;
  updatedAt: string;
};

export type PlaybackEvent =
  | { id: string; kind: "call"; payload: CallProp }
  | { id: string; kind: "text"; payload: TextMessageProp };

export type PlaybackPhase = "idle" | "homeWaiting" | "active" | "completed";

export type PersistedAppState = {
  clock: SimulatedClock;
  callPresets: Preset<CallProp>[];
  textPresets: Preset<TextMessageProp>[];
  messageHistory: string[];
};

