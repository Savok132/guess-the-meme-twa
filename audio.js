// Звуковой движок для Telegram Web App
// Воспроизводит НАСТОЯЩИЕ оригинальные аудио-дорожки мемов (MP3) и звуковые эффекты

class MemeAudioEngine {
  constructor() {
    this.isMuted = localStorage.getItem('meme_sound_muted') === 'true';
    this.currentMemeAudio = null;
    this.audioCache = {};

    // Настоящие аудио-файлы мемов
    this.memeTracks = {
      povar: 'audio/povar.mp3',
      litvinkov: 'audio/litvinkov.mp3',
      druzhko: 'audio/druzhko.mp3',
      dedushka: 'audio/dedushka.mp3',
      misha: 'audio/misha.mp3',
      kandibober: 'audio/kandibober.mp3',
      hamster: 'audio/hamster.mp3',
      pedro: 'audio/pedro.mp3',
      capybara: 'audio/capybara.mp3',
      the_rock: 'audio/the_rock.mp3',
      skibidi: 'audio/skibidi.mp3',
      baza: 'audio/baza.mp3',
      mogiote: 'audio/mogiote.mp3',
      sigma: 'audio/sigma.mp3',
      vineBoom: 'audio/vine_boom.mp3'
    };
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('meme_sound_muted', this.isMuted.toString());
    if (this.isMuted) this.stopCurrentAudio();
    return this.isMuted;
  }

  stopCurrentAudio() {
    if (this.currentMemeAudio) {
      try {
        this.currentMemeAudio.pause();
        this.currentMemeAudio.currentTime = 0;
      } catch (e) {}
      this.currentMemeAudio = null;
    }
  }

  triggerHaptic(type = 'light') {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      try {
        if (type === 'impact') {
          window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
        } else if (type === 'success') {
          window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        } else if (type === 'error') {
          window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        } else {
          window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
      } catch (e) {}
    }
  }

  // Воспроизведение реального MP3 аудио-файла мема
  playSoundPreset(presetName) {
    if (this.isMuted) return;
    this.stopCurrentAudio();
    this.triggerHaptic('light');

    const soundPath = this.memeTracks[presetName] || this.memeTracks['vineBoom'];
    if (!soundPath) return;

    try {
      const audio = new Audio(soundPath);
      this.currentMemeAudio = audio;
      audio.volume = 1.0;
      audio.play().catch(err => {
        console.log('Audio autoplay prevented or error:', err);
      });
    } catch (e) {
      console.error('Play audio error:', e);
    }
  }

  // --- ИГРОВЫЕ ЭФФЕКТЫ ---

  playVineBoom() {
    this.triggerHaptic('impact');
    if (this.isMuted) return;
    this.playSoundPreset('vineBoom');
  }

  playCorrect() {
    this.triggerHaptic('success');
    if (this.isMuted) return;
    // Легкий звук успеха через AudioContext
    this.playToneChord([523.25, 659.25, 783.99, 1046.50]);
  }

  playWrong() {
    this.triggerHaptic('error');
    if (this.isMuted) return;
    this.playVineBoom();
  }

  playPop() {
    this.triggerHaptic('light');
    if (this.isMuted) return;
    this.playClickTone();
  }

  playStreak(comboLevel = 2) {
    this.triggerHaptic('impact');
    if (this.isMuted) return;
    this.playToneChord([440, 554.37, 659.25, 880]);
  }

  playVictory() {
    this.triggerHaptic('success');
    if (this.isMuted) return;
    this.playSoundPreset('mogiote'); // "Умеете, могёте просто!"
  }

  playToneChord(freqs) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      let t = ctx.currentTime;
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t + idx * 0.06);
        gain.gain.setValueAtTime(0.25, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.35);
      });
    } catch (e) {}
  }

  playClickTone() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }
}

window.memeAudio = new MemeAudioEngine();
