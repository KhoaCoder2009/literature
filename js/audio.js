/* =========================================================================
   2. WEB AUDIO SYNTHESIZER & SOUND EFFECTS
   ========================================================================= */

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

// SFX Sound Enabled
let soundEnabled = true;
try {
  soundEnabled = localStorage.getItem('vq_sound_enabled') !== 'false';
} catch (error) {
  console.warn('Could not load sound preference:', error);
}

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Bật/tắt trạng thái hiển thị của nút âm thanh
function toggleSoundButtonState() {
  const button = $('#sound-toggle');
  if (button) {
    button.textContent = soundEnabled ? '🔊' : '🔇';
    button.title = soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh';
    button.setAttribute('aria-label', soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh');
    button.setAttribute('aria-pressed', String(soundEnabled));
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  toggleSoundButtonState();
  try {
    localStorage.setItem('vq_sound_enabled', String(soundEnabled));
  } catch (error) {
    console.warn('Could not save sound preference:', error);
  }
  if (soundEnabled) {
    playSound('pop');
  }
  if (typeof updateSettingsUI === 'function') updateSettingsUI();
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    initAudioContext();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click' || type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(740, t + 0.07);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.08);
    } else if (type === 'correct') {
      // Âm thanh vui tươi khi trả lời đúng
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc.type = 'sine';
      osc2.type = 'triangle';

      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.setValueAtTime(659.25, t + 0.09); // E5
      osc.frequency.setValueAtTime(783.99, t + 0.18); // G5
      osc.frequency.setValueAtTime(1046.50, t + 0.27); // C6

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc2.frequency.setValueAtTime(261.63, t); // C4
      gain2.gain.setValueAtTime(0.08, t);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + 0.45);
      osc2.stop(t + 0.35);
    } else if (type === 'wrong') {
      // Âm thanh báo sai nhẹ nhàng
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.linearRampToValueAtTime(180, t + 0.18);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.25);
    } else if (type === 'win') {
      // Hoàn thành xuất sắc
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, t + idx * 0.1);
        g.gain.setValueAtTime(0.15, t + idx * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.3);
        o.start(t + idx * 0.1);
        o.stop(t + idx * 0.1 + 0.3);
      });
    }
  } catch (err) {
    console.warn('Audio play error:', err);
  }
}

// Khởi động AudioContext khi tương tác lần đầu
window.addEventListener('click', function unlockAudio() {
  initAudioContext();
  window.removeEventListener('click', unlockAudio);
}, { once: true });
