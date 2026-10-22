import React, { useState, useEffect, useRef } from 'react';
import { Waves, Moon, Sun, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Plus } from 'lucide-react';
import { Product } from '../types';

interface TidalRitualsScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const TidalRitualsScreen: React.FC<TidalRitualsScreenProps> = ({
  products,
  onAddToCart,
  onOpenProductDetail,
  formatPrice,
}) => {
  const [selectedRitualType, setSelectedRitualType] = useState<'am' | 'pm'>('pm');
  
  // Timer State for 3-minute Celadon Stone Massage
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 mins default
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState<'3min' | '5min' | '10min'>('3min');

  // Ocean Audio Ambience generator using Web Audio API
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const toggleOceanAudio = () => {
    if (isAudioPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Create pink/brown noise for ocean surf
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Low-pass filter simulating underwater depth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, ctx.currentTime);

        // LFO for wave ebb and flow
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 seconds per tide wave

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.06, ctx.currentTime);

        lfo.connect(mainGain.gain);
        whiteNoise.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(ctx.destination);

        whiteNoise.start();
        lfo.start();

        setIsAudioPlaying(true);
      } catch (e) {
        console.error("Audio initialization error", e);
      }
    }
  };

  const handlePreset = (preset: '3min' | '5min' | '10min', seconds: number) => {
    setTimerPreset(preset);
    setTimerSeconds(seconds);
    setTimerRunning(false);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const ritualProducts = products.filter(p => p.category === 'tidal-rituals' || p.id === 'moonlit-nectar-serum');

  return (
    <div className="w-full pt-4 pb-20 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-b from-primary-fixed/30 via-surface-container-low to-surface py-12 px-4 md:px-8 lg:px-16 mb-10 border-b border-surface-variant/40">
        <div className="max-w-[1440px] mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-primary mb-4 shadow-xs text-[11px] font-outfit uppercase tracking-wider font-semibold">
            <Waves className="w-3.5 h-3.5 text-secondary" />
            Collection 03 • Circadian Chrono-Biology
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl text-primary font-normal mb-3">
            Deep Sea Tidal Rituals
          </h1>
          <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
            Synchronize your skincare cadence with the ocean’s circadian tidal flux. Ancient Celtic marine minerals paired with carved celadon acupressure stones.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Ambient Oceanic Sound & Sculpting Studio Card */}
        <div className="mb-14 bg-gradient-to-br from-surface-container via-surface-container-low to-primary-fixed/20 rounded-3xl p-6 md:p-10 border border-white/60 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: Audio & Timer Controls */}
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold">
                  Mindful Tidal Cadence
                </span>
                
                {/* Audio button */}
                <button
                  onClick={toggleOceanAudio}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-outfit transition-all cursor-pointer ${
                    isAudioPlaying
                      ? 'bg-secondary text-white shadow-xs'
                      : 'bg-surface-container-lowest text-on-surface hover:text-primary'
                  }`}
                  title="Toggle synthesised ocean tide ambience"
                >
                  {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isAudioPlaying ? 'Ocean Sound: Active' : 'Enable Ocean Waves'}</span>
                </button>
              </div>

              <h2 className="font-playfair text-2xl md:text-3xl text-primary font-normal">
                Celadon Stone Sculpting Protocol
              </h2>
              <p className="font-outfit text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                Follow our 3-step lymphatic drainage technique. Inhale deeply, glide along facial meridians, and stimulate cellular fluid turnover.
              </p>

              {/* Timer presets */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handlePreset('3min', 180)}
                  className={`px-3 py-1 rounded-full text-xs font-outfit ${
                    timerPreset === '3min' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface'
                  }`}
                >
                  3 Min Sculpt
                </button>
                <button
                  onClick={() => handlePreset('5min', 300)}
                  className={`px-3 py-1 rounded-full text-xs font-outfit ${
                    timerPreset === '5min' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface'
                  }`}
                >
                  5 Min De-Puff
                </button>
                <button
                  onClick={() => handlePreset('10min', 600)}
                  className={`px-3 py-1 rounded-full text-xs font-outfit ${
                    timerPreset === '10min' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface'
                  }`}
                >
                  10 Min Sanctuary
                </button>
              </div>
            </div>

            {/* Right: Circular Interactive Timer Display */}
            <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-6 border border-white/70 shadow-md flex flex-col items-center min-w-[240px]">
              <span className="font-outfit text-[10px] text-outline uppercase tracking-wider mb-2">
                Ritual Duration
              </span>
              <div className="font-playfair text-5xl text-primary font-light tracking-wider my-1">
                {formatTimer(timerSeconds)}
              </div>
              <p className="font-outfit text-[11px] text-secondary font-medium mb-4">
                {timerRunning ? 'Glide Upward & Outward' : timerSeconds === 0 ? 'Ritual Complete' : 'Ready to Begin'}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="bg-primary hover:bg-primary-container text-on-primary w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                  aria-label={timerRunning ? 'Pause' : 'Start'}
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(timerPreset === '3min' ? 180 : timerPreset === '5min' ? 300 : 600);
                  }}
                  className="bg-surface-container hover:bg-surface-variant text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* AM vs PM Ritual Tabs */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedRitualType('am')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-outfit text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedRitualType === 'am'
                  ? 'bg-primary text-white shadow-md font-medium'
                  : 'bg-surface-container hover:bg-surface-variant text-on-surface'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-300" />
              <span>Solar Dawn Ritual (AM)</span>
            </button>
            <button
              onClick={() => setSelectedRitualType('pm')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-outfit text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedRitualType === 'pm'
                  ? 'bg-primary text-white shadow-md font-medium'
                  : 'bg-surface-container hover:bg-surface-variant text-on-surface'
              }`}
            >
              <Moon className="w-4 h-4 text-primary-fixed" />
              <span>Nocturnal Tide Ritual (PM)</span>
            </button>
          </div>

          {/* Steps Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedRitualType === 'am' ? (
              <>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/40 space-y-3">
                  <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest font-semibold">
                    Step 01 • Awaken
                  </span>
                  <h4 className="font-playfair text-xl text-primary font-medium">Bio-Pearl Cellular Mist</h4>
                  <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                    Mist 4 generous pumps onto clean, dry skin. Press palms gently into face to awaken dermal micro-circulation with cold kelp ions.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/40 space-y-3">
                  <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest font-semibold">
                    Step 02 • Fortify
                  </span>
                  <h4 className="font-playfair text-xl text-primary font-medium">Moonlit Nectar Algae Serum</h4>
                  <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                    Dispense 3 drops of pure marine phytoplankton serum. Smooth upward from clavicle across jaw and cheeks.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/40 space-y-3">
                  <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest font-semibold">
                    Step 03 • Shield
                  </span>
                  <h4 className="font-playfair text-xl text-primary font-medium">Pearl Veil SPF 30 Dew Drops</h4>
                  <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                    Finish with broad spectrum non-nano zinc defense. Imparts an all-day light-diffusing glass sheen.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/40 space-y-3">
                  <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest font-semibold">
                    Step 01 • Reset
                  </span>
                  <h4 className="font-playfair text-xl text-primary font-medium">Opal Wave Cloud Cream</h4>
                  <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                    Apply a generous layer of multi-peptide cream to replenish lipid depletion accrued from daylight exposure.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/40 space-y-3">
                  <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest font-semibold">
                    Step 02 • Sculpt
                  </span>
                  <h4 className="font-playfair text-xl text-primary font-medium">Celadon Tidal Jade Gliding</h4>
                  <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                    Using the cooling scalloped jade edge, perform gentle upward sweeping motions across jawline, cheekbones, and brow line.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/40 space-y-3">
                  <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest font-semibold">
                    Step 03 • Cocoon
                  </span>
                  <h4 className="font-playfair text-xl text-primary font-medium">Celeste Midnight Overnight Mask</h4>
                  <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                    Lock in chronobiology repair enzymes with indigo marine actives. Wake up to dewy, plump cellular restoration.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Featured Ritual Formulations */}
        <div>
          <h3 className="font-playfair text-2xl text-primary font-normal mb-6">
            Ritual Tools & Overnight Formulations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ritualProducts.map(prod => (
              <div
                key={prod.id}
                className="bg-surface-container-lowest rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all group border border-surface-variant/40"
              >
                <div>
                  <div
                    onClick={() => onOpenProductDetail(prod)}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container mb-4 cursor-pointer"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {prod.tag && (
                      <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full font-outfit text-[10px] text-primary uppercase font-medium tracking-wider shadow-xs">
                        {prod.tag}
                      </span>
                    )}
                  </div>

                  <h4
                    onClick={() => onOpenProductDetail(prod)}
                    className="font-playfair text-xl text-primary mb-1 hover:text-secondary transition-colors cursor-pointer font-medium"
                  >
                    {prod.name}
                  </h4>
                  <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light mb-4">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="font-outfit text-base font-semibold text-primary">
                    {formatPrice(prod.price)}
                  </span>
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="bg-surface-container hover:bg-primary hover:text-white text-primary font-outfit text-[11px] uppercase tracking-wider px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
