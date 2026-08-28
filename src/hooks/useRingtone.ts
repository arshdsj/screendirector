import * as FileSystem from "expo-file-system/legacy";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";

const ringtoneUri = `${FileSystem.cacheDirectory}screendirector-ring.wav`;

const toBase64 = (bytes: Uint8Array) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  for (let index = 0; index < bytes.length; index += 3) {
    const a = bytes[index] ?? 0;
    const b = bytes[index + 1] ?? 0;
    const c = bytes[index + 2] ?? 0;
    const triplet = (a << 16) | (b << 8) | c;
    result += alphabet[(triplet >> 18) & 63];
    result += alphabet[(triplet >> 12) & 63];
    result += index + 1 < bytes.length ? alphabet[(triplet >> 6) & 63] : "=";
    result += index + 2 < bytes.length ? alphabet[triplet & 63] : "=";
  }
  return result;
};

function createRingtoneWav() {
  const sampleRate = 16000;
  const seconds = 2;
  const sampleCount = sampleRate * seconds;
  const bytes = new Uint8Array(44 + sampleCount * 2);
  const view = new DataView(bytes.buffer);
  const writeText = (offset: number, text: string) => {
    for (let index = 0; index < text.length; index += 1) view.setUint8(offset + index, text.charCodeAt(index));
  };
  writeText(0, "RIFF");
  view.setUint32(4, 36 + sampleCount * 2, true);
  writeText(8, "WAVEfmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, sampleCount * 2, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const inRing = index % sampleRate < sampleRate * 0.72;
    const wave = inRing
      ? (Math.sin((2 * Math.PI * 440 * index) / sampleRate) + Math.sin((2 * Math.PI * 480 * index) / sampleRate)) * 0.18
      : 0;
    view.setInt16(44 + index * 2, Math.round(wave * 32767), true);
  }
  return toBase64(bytes);
}

export function useRingtone(shouldPlay: boolean) {
  const [source, setSource] = useState<string | null>(null);
  const player = useAudioPlayer(source);

  useEffect(() => {
    let mounted = true;
    FileSystem.getInfoAsync(ringtoneUri).then(async (info) => {
      if (!info.exists) {
        await FileSystem.writeAsStringAsync(ringtoneUri, createRingtoneWav(), {
          encoding: FileSystem.EncodingType.Base64,
        });
      }
      if (mounted) setSource(ringtoneUri);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!source) return;
    player.loop = true;
    if (shouldPlay) player.play();
    else player.pause();
    return () => player.pause();
  }, [player, shouldPlay, source]);
}

