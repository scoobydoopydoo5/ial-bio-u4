import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Volume2, VolumeX, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useResultsSettings, Session } from "@/hooks/useResultsSettings";
import { motion, AnimatePresence } from "framer-motion";

const BUNNY_GIF =
  "https://imagedelivery.net/c2SKP8Bk0ZKw6UDgeeIlbw/6e4c5504-a855-41e5-75aa-fb9db633a300/public";

const AYAHS = [
  {
    text: 'And your Lord says, "Call upon Me; I will respond to you."',
    reference: "Surah Ghafir 40:60",
  },
  {
    text: "And when My servants ask you, [O Muhammad], concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    reference: "Surah Al-Baqarah 2:186",
  },
  {
    text: "Is He [not best] who responds to the desperate one when he calls upon Him and removes evil and makes you inheritors of the earth? Is there a deity with Allah? Little do you remember.",
    reference: "Surah An-Naml 27:62",
  },
];

const ResultsTimerBunny: React.FC = () => {
  const { settings, setSession } = useResultsSettings();
  const [isMuted, setIsMuted] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(
    !settings.hasSelectedSession,
  );
  const [isShaking, setIsShaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [selectedAyah, setSelectedAyah] = useState<(typeof AYAHS)[0] | null>(
    null,
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // Anxious heartbeat sound using Web Audio API
  useEffect(() => {
    const createAnxiousHeartbeat = () => {
      try {
        const audioContext = new (
          window.AudioContext || (window as any).webkitAudioContext
        )();
        audioContextRef.current = audioContext;

        const playHeartbeat = () => {
          if (isMuted || !audioContextRef.current) return;

          const ctx = audioContextRef.current;
          const now = ctx.currentTime;

          // First beat (louder, faster attack)
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(60, now);
          osc1.frequency.exponentialRampToValueAtTime(30, now + 0.1);
          gain1.gain.setValueAtTime(0, now);
          gain1.gain.linearRampToValueAtTime(0.4, now + 0.02);
          gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start(now);
          osc1.stop(now + 0.15);

          // Second beat (quick follow-up - anxious double beat)
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(55, now + 0.18);
          osc2.frequency.exponentialRampToValueAtTime(25, now + 0.28);
          gain2.gain.setValueAtTime(0, now + 0.18);
          gain2.gain.linearRampToValueAtTime(0.3, now + 0.2);
          gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(now + 0.18);
          osc2.stop(now + 0.32);
        };

        // Fast anxious heartbeat - 100 BPM with screen shake
        intervalRef.current = setInterval(() => {
          playHeartbeat();
          // Trigger screen shake
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 150);
        }, 600);
        playHeartbeat();
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 150);
      } catch (error) {
        console.log("Web Audio API not supported");
      }
    };

    if (!isMuted) {
      createAnxiousHeartbeat();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isMuted]);

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const resultsTime = new Date(settings.resultsDate).getTime();
      const difference = resultsTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [settings.resultsDate]);

  const handleSelectSession = (session: Session) => {
    setSession(session);
    setShowSessionModal(false);
  };

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const isResultsDay =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  // Floating ayah positions - optimized for mobile
  const floatingAyahs = [
    { ayah: AYAHS[0], top: "5%", left: "2%", delay: 0, mobileHide: false },
    { ayah: AYAHS[1], top: "12%", right: "2%", delay: 0.5, mobileHide: false },
    { ayah: AYAHS[2], bottom: "25%", left: "2%", delay: 1, mobileHide: true },
    { ayah: AYAHS[0], bottom: "5%", right: "2%", delay: 1.5, mobileHide: true },
    { ayah: AYAHS[1], top: "35%", left: "1%", delay: 2, mobileHide: true },
    { ayah: AYAHS[2], top: "45%", right: "1%", delay: 2.5, mobileHide: true },
  ];

  const handleAyahClick = (ayah: (typeof AYAHS)[0], index: number) => {
    setHighlightedIndex(index);
    setSelectedAyah(ayah);
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-black"
      animate={
        isShaking
          ? {
              x: [0, -3, 3, -2, 2, 0],
              y: [0, 2, -2, 1, -1, 0],
            }
          : {}
      }
      transition={{ duration: 0.15 }}
    >
      {/* Floating Ayahs all over the page - Interactive */}
      {/* {floatingAyahs.map((item, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity:
              highlightedIndex === index ? [0.8, 1, 0.8] : [0.3, 0.6, 0.3],
            scale: highlightedIndex === index ? 1.05 : 1,
          }}
          whileHover={{ opacity: 0.9, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          onClick={() => handleAyahClick(item.ayah, index)}
          className={`absolute z-10 max-w-[140px] sm:max-w-[180px] md:max-w-[250px] text-xs sm:text-sm italic text-center leading-relaxed cursor-pointer transition-colors duration-300 p-2 rounded-lg hover:bg-white/5 ${
            highlightedIndex === index
              ? "text-white/80 bg-white/10"
              : "text-green-300/60"
          } ${item.mobileHide ? "hidden md:block" : ""}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
        >
          "
          {item.ayah.text.length > 60
            ? item.ayah.text.substring(0, 60) + "..."
            : item.ayah.text}
          "
        </motion.button>
      ))} */}

      {/* Ayah Detail Modal */}
      <AnimatePresence>
        {selectedAyah && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => {
              setSelectedAyah(null);
              setHighlightedIndex(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-lg mx-4 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedAyah(null);
                  setHighlightedIndex(null);
                }}
                className="absolute top-3 right-3 text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed italic mb-6">
                    "{selectedAyah.text}"
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="h-px bg-white/20 w-12" />
                  <p className="text-emerald-400 text-sm font-medium">
                    {selectedAyah.reference}
                  </p>
                  <div className="h-px bg-white/20 w-12" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <Link to="/timer/results">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Session Selection Modal */}
      <AnimatePresence>
        {showSessionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-xl p-8 max-w-sm mx-4"
            >
              <h2 className="text-xl font-medium text-center mb-6 text-white">
                Select your session
              </h2>
              <div className="space-y-3">
                <Button
                  onClick={() => handleSelectSession("oct2025")}
                  variant="outline"
                  className="w-full h-auto py-4 bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  <div className="text-center">
                    <div className="font-medium">October 2025</div>
                    <div className="text-sm text-white/50">
                      Results: 22 Jan 2026
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => handleSelectSession("jan2026")}
                  variant="outline"
                  className="w-full h-auto py-4 bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  <div className="text-center">
                    <div className="font-medium">January 2026</div>
                    <div className="text-sm text-white/50">
                      Results: 5 Mar 2026
                    </div>
                  </div>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-16 sm:py-8">
        {/* TIME LEFT Label */}
        {isResultsDay ? (
          <motion.div className="mb-6 text-center">
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-4xl md:text-6xl font-bold text-white"
            >
              RESULTS ARE OUT
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center"
          >
            <div className="text-3xl flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 text-white font-mono">
              <motion.span
                className="text-3xl sm:text-5xl md:text-8xl font-bold tabular-nums"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                {formatNumber(timeLeft.days)}
              </motion.span>
              <span className="text-lg sm:text-2xl md:text-4xl text-white/40">
                :
              </span>
              <motion.span
                className="text-3xl sm:text-5xl md:text-8xl font-bold tabular-nums"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
              >
                {formatNumber(timeLeft.hours)}
              </motion.span>
              <span className="text-lg sm:text-2xl md:text-4xl text-white/40">
                :
              </span>
              <motion.span
                className="text-3xl sm:text-5xl md:text-8xl font-bold tabular-nums"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              >
                {formatNumber(timeLeft.minutes)}
              </motion.span>
              <span className="text-lg sm:text-2xl md:text-4xl text-white/40">
                :
              </span>
              <motion.span
                className="text-3xl sm:text-5xl md:text-8xl font-bold text-red-500 tabular-nums"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
              >
                {formatNumber(timeLeft.seconds)}
              </motion.span>
            </div>
            <div className="flex justify-center gap-4 sm:gap-8 md:gap-14 mt-2 text-white/40 text-[10px] sm:text-xs md:text-sm font-mono tracking-wider">
              <span>DAYS</span>
              <span>HRS</span>
              <span>MIN</span>
              <span>SEC</span>
            </div>
          </motion.div>
        )}

        {/* Countdown Timer - Shows actual time */}

        {/* Giant Bunny GIF */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          {/* Pulsing heartbeat glow */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 60px 20px rgba(239, 68, 68, 0.2)",
                "0 0 100px 40px rgba(239, 68, 68, 0.4)",
                "0 0 60px 20px rgba(239, 68, 68, 0.2)",
              ],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-3xl"
          />

          {/* The bunny GIF */}
          <motion.img
            src={BUNNY_GIF}
            alt="Anxious waiting bunny"
            className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] object-contain"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Heartbeat indicator */}
        </motion.div>

        {/* Session info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-white/30 text-center text-sm"
        >
          {settings.session === "oct2025" ? "October 2025" : "January 2026"}{" "}
          Session
          <br />
          <span className="text-white/50">
            {settings.resultsDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ResultsTimerBunny;
