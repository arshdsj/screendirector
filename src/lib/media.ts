import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";

import { createId } from "@/lib/data";
import type { MediaAsset } from "@/models";

const mediaDirectory = `${FileSystem.documentDirectory}media/`;

export async function importLocalImage(): Promise<MediaAsset | undefined> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.9,
  });

  if (result.canceled || !result.assets[0]) return undefined;

  await FileSystem.makeDirectoryAsync(mediaDirectory, { intermediates: true });
  const source = result.assets[0];
  const extension = source.fileName?.split(".").pop() || "jpg";
  const id = createId();
  const fileName = `${id}.${extension}`;
  const localUri = `${mediaDirectory}${fileName}`;
  await FileSystem.copyAsync({ from: source.uri, to: localUri });

  return { id, localUri, fileName, mediaType: "image" };
}

