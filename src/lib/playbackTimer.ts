export class OneShotPlaybackTimer {
  private timeout: ReturnType<typeof setTimeout> | undefined;
  private fired = false;

  start(delayMs: number, callback: () => void) {
    this.cancel();
    this.fired = false;
    this.timeout = setTimeout(() => {
      if (this.fired) return;
      this.fired = true;
      this.timeout = undefined;
      callback();
    }, Math.max(0, delayMs));
  }

  cancel() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  get hasFired() {
    return this.fired;
  }
}

