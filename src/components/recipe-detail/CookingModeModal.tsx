import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Flame,
  ChefHat,
  Bell
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../../types/recipe';

interface CookingModeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  scaledServings: number;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  isOpen,
  onClose,
  scaledServings,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const timerIntervalRef = useRef<any>(null);
  const currentStep = recipe.instructions[currentStepIndex];

  // Initialize timer when step changes if it has a timer
  useEffect(() => {
    if (currentStep?.timerMinutes) {
      setTimerSecondsLeft(currentStep.timerMinutes * 60);
      setIsTimerRunning(false);
    } else {
      setTimerSecondsLeft(null);
      setIsTimerRunning(false);
    }
  }, [currentStepIndex, currentStep]);

  // Timer countdown effect
  useEffect(() => {
    if (isTimerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev !== null && prev > 1) {
            return prev - 1;
          } else {
            // Timer complete chime
            playChime();
            setIsTimerRunning(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, timerSecondsLeft]);

  // Audio tone generator using Web Audio API for timer alarm
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // Audio fallback
    }
  };

  // Text-to-speech reader
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const text = `Step ${currentStep.stepNumber}. ${currentStep.title ? currentStep.title + '. ' : ''}${currentStep.instruction}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleToggleComplete = (stepNum: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNum) ? prev.filter(s => s !== stepNum) : [...prev, stepNum]
    );
  };

  const handleFinishCooking = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  const totalSteps = recipe.instructions.length;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#121B15] text-white flex flex-col overflow-hidden animate-fade-in">
      
      {/* Top Header Bar */}
      <div className="h-18 px-6 sm:px-10 border-b border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sage-800 flex items-center justify-center text-white">
            <ChefHat className="w-5 h-5 text-cream-100" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sage-300">
              Interactive Cooking Assistant
            </span>
            <h2 className="font-serif text-base sm:text-lg font-bold text-white truncate max-w-xs sm:max-w-md">
              {recipe.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-stone-200">
            {scaledServings} Servings
          </span>

          <button
            onClick={toggleSpeech}
            className={`p-2.5 rounded-full border transition-all ${
              isSpeaking
                ? 'bg-sage-600 border-sage-500 text-white animate-pulse'
                : 'bg-white/10 border-white/20 text-stone-300 hover:bg-white/20'
            }`}
            title="Read step instructions out loud"
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10">
        <div
          className="h-full bg-terracotta-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Body */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-10 py-8 flex flex-col justify-between overflow-y-auto">
        
        {/* Step Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-sage-800/80 border border-sage-700 text-sage-100">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>

            <button
              onClick={() => handleToggleComplete(currentStep.stepNumber)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                completedSteps.includes(currentStep.stepNumber)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedSteps.includes(currentStep.stepNumber) ? 'Completed' : 'Mark Step Done'}
              </span>
            </button>
          </div>

          {/* Step Title & Instruction */}
          <div className="space-y-4">
            {currentStep.title && (
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {currentStep.title}
              </h3>
            )}
            <p className="text-lg sm:text-2xl text-stone-200 font-medium leading-relaxed max-w-4xl">
              {currentStep.instruction}
            </p>
          </div>

          {/* Step Tip Callout */}
          {currentStep.tip && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-3 max-w-3xl">
              <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-200 block uppercase tracking-wider">
                  Chef's Pro Tip
                </span>
                <p className="text-sm text-stone-300 mt-0.5">{currentStep.tip}</p>
              </div>
            </div>
          )}

          {/* Interactive Step Timer (if applicable) */}
          {timerSecondsLeft !== null && (
            <div className="p-6 rounded-3xl bg-black/40 border border-white/15 max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-terracotta-300">
                  <Bell className="w-4 h-4" />
                  Kitchen Step Timer
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white">
                  {formatTimer(timerSecondsLeft)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-soft'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSecondsLeft((currentStep.timerMinutes || 1) * 60);
                  }}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setTimerSecondsLeft(prev => (prev || 0) + 60)}
                  className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-stone-200"
                >
                  +1 min
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation Buttons */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white text-sm font-semibold transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {isLastStep ? (
            <button
              onClick={handleFinishCooking}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-soft-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Finish Cooking 🎉</span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (!completedSteps.includes(currentStep.stepNumber)) {
                  handleToggleComplete(currentStep.stepNumber);
                }
                setCurrentStepIndex(prev => Math.min(totalSteps - 1, prev + 1));
              }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-bold shadow-soft-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
