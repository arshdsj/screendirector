import { useCallback, useEffect, useRef, useState } from "react";

import { OneShotPlaybackTimer } from "@/lib/playbackTimer";
import type { PlaybackEvent, PlaybackPhase } from "@/models";

export function usePlaybackMachine(event?: PlaybackEvent) {
  const [phase, setPhase] = useState<PlaybackPhase>(event ? "homeWaiting" : "idle");
  const timer = useRef(new OneShotPlaybackTimer());

  useEffect(() => {
    if (!event) {
      setPhase("idle");
      return;
    }

    setPhase("homeWaiting");
    timer.current.start(event.payload.delaySeconds * 1000, () => setPhase("active"));
    return () => timer.current.cancel();
  }, [event]);

  const complete = useCallback(() => {
    timer.current.cancel();
    setPhase("completed");
  }, []);

  const cancel = useCallback(() => {
    timer.current.cancel();
    setPhase("idle");
  }, []);

  return { phase, complete, cancel };
}

