import { afterEach, describe, expect, it, vi } from "vitest";

import { OneShotPlaybackTimer } from "./playbackTimer";

afterEach(() => vi.useRealTimers());

describe("OneShotPlaybackTimer", () => {
  it("fires exactly once", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const timer = new OneShotPlaybackTimer();
    timer.start(1_000, callback);
    vi.advanceTimersByTime(10_000);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(timer.hasFired).toBe(true);
  });

  it("does not fire after cancellation", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const timer = new OneShotPlaybackTimer();
    timer.start(1_000, callback);
    timer.cancel();
    vi.advanceTimersByTime(2_000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("replaces an existing pending event", () => {
    vi.useFakeTimers();
    const first = vi.fn();
    const second = vi.fn();
    const timer = new OneShotPlaybackTimer();
    timer.start(1_000, first);
    timer.start(500, second);
    vi.advanceTimersByTime(2_000);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});

