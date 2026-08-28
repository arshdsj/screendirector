import { describe, expect, it } from "vitest";

import { addMessageToHistory, deleteHistoryEntry, deletePreset, upsertPreset } from "./data";
import type { CallProp, MediaAsset } from "../models";

const call: CallProp = {
  callerName: "Mara",
  direction: "incoming",
  delaySeconds: 4,
  ringtoneEnabled: true,
};

describe("preset data", () => {
  it("creates, updates, serializes, and deletes presets", () => {
    const created = upsertPreset([], "Hero call", call, "2026-08-28T00:00:00.000Z");
    const updated = upsertPreset(
      created,
      "hero CALL",
      { ...call, delaySeconds: 8 },
      "2026-08-28T00:01:00.000Z",
    );

    expect(updated).toHaveLength(1);
    expect(updated[0].id).toBe(created[0].id);
    expect(updated[0].value.delaySeconds).toBe(8);
    expect(JSON.parse(JSON.stringify(updated))).toEqual(updated);
    expect(deletePreset(updated, updated[0].id)).toEqual([]);
  });

  it("keeps copied local media references through serialization", () => {
    const avatar: MediaAsset = {
      id: "media-1",
      fileName: "media-1.jpg",
      localUri: "file:///documents/media/media-1.jpg",
      mediaType: "image",
    };
    const stored = upsertPreset([], "With photo", { ...call, avatar });
    const restored = JSON.parse(JSON.stringify(stored)) as typeof stored;
    expect(restored[0].value.avatar?.localUri).toBe(avatar.localUri);
  });
});

describe("message history", () => {
  it("deduplicates, moves reused messages first, and deletes entries", () => {
    let history = addMessageToHistory([], "  First message  ");
    history = addMessageToHistory(history, "Second message");
    history = addMessageToHistory(history, "First message");
    expect(history).toEqual(["First message", "Second message"]);
    expect(deleteHistoryEntry(history, "First message")).toEqual(["Second message"]);
  });
});

