class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playClick() { this.playTone(600, 'square', 0.1, 0.05); }
  
  playEat() {
    this.playTone(880, 'sine', 0.1, 0.1);
    setTimeout(() => this.playTone(1200, 'sine', 0.1, 0.08), 50);
  }

  playSpecialEat() {
    this.playTone(600, 'square', 0.1, 0.1);
    setTimeout(() => this.playTone(800, 'square', 0.1, 0.1), 100);
    setTimeout(() => this.playTone(1200, 'square', 0.2, 0.1), 200);
  }

  playGameOver() {
    this.playTone(300, 'sawtooth', 0.3, 0.1);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.5, 0.1), 200);
    setTimeout(() => this.playTone(200, 'sawtooth', 0.7, 0.1), 400);
  }

  // The missing sound effect!
  playLevelUp() {
    this.playTone(440, 'square', 0.1, 0.1);
    setTimeout(() => this.playTone(554, 'square', 0.1, 0.1), 100);
    setTimeout(() => this.playTone(659, 'square', 0.1, 0.1), 200);
    setTimeout(() => this.playTone(880, 'square', 0.3, 0.1), 300);
  }
  
  play() { this.playClick(); }
  toggleMute() { this.muted = !this.muted; return this.muted; }
  setMuted(isMuted: boolean) { this.muted = isMuted; }
  getIsMuted() { return this.muted; }
}

export const sound = new RetroAudioEngine();