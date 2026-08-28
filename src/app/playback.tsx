import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useKeepAwake } from "expo-keep-awake";
import { useEffect, useState } from "react";

import { CallPresentation } from "@/components/CallPresentation";
import { SimulatedHome } from "@/components/SimulatedHome";
import { TextNotification } from "@/components/TextNotification";
import { usePlaybackMachine } from "@/hooks/usePlaybackMachine";
import { useRingtone } from "@/hooks/useRingtone";
import { useAppStore } from "@/store/AppStore";

export default function PlaybackScreen() {
  useKeepAwake();
  const { clock, playbackEvent, clearPlayback } = useAppStore();
  const { phase, complete, cancel } = usePlaybackMachine(playbackEvent);
  const [accepted, setAccepted] = useState(false);
  const ringing =
    playbackEvent?.kind === "call" &&
    playbackEvent.payload.direction === "incoming" &&
    playbackEvent.payload.ringtoneEnabled &&
    phase === "active" &&
    !accepted;
  useRingtone(ringing);

  useEffect(() => {
    if (!playbackEvent) router.replace("/");
  }, [playbackEvent]);

  const returnToEditor = () => {
    cancel();
    clearPlayback();
    router.replace("/");
  };

  return (
    <>
      <StatusBar hidden />
      <SimulatedHome clock={clock} onDirectorPress={returnToEditor}>
        {playbackEvent?.kind === "call" && phase === "active" ? (
          <CallPresentation
            call={playbackEvent.payload}
            clock={clock}
            accepted={accepted}
            onAccept={() => setAccepted(true)}
            onEnd={complete}
          />
        ) : null}
        {playbackEvent?.kind === "text" && phase === "active" ? (
          <TextNotification text={playbackEvent.payload} onDismiss={complete} />
        ) : null}
      </SimulatedHome>
    </>
  );
}

