import { useEffect, useRef, useState } from "react";

interface Props {
  words: string[];
  enabled: boolean;
}

type Phase = "typing" | "pause" | "deleting";

export default function TypingText({ words, enabled }: Props) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const currentWord = words[wordIndex];

  const audioCtx = useRef<AudioContext | null>(null);
  const audioEnabled = useRef(false);

  /**
   * Unlock audio after first user interaction.
   */
  useEffect(() => {
    if (!enabled) return;

    const unlock = async () => {
      if (!audioCtx.current) {
        audioCtx.current = new AudioContext();
      }

      if (audioCtx.current.state === "suspended") {
        await audioCtx.current.resume();
      }

      audioEnabled.current = true;

      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [enabled]);

  /**
   * Pause/resume audio when tab visibility changes.
   */
  useEffect(() => {
    const handleVisibility = async () => {
      if (!audioCtx.current) return;

      if (document.hidden) {
        await audioCtx.current.suspend();
      } else if (audioEnabled.current) {
        await audioCtx.current.resume();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  /**
   * Reset typing when disabled.
   */
  useEffect(() => {
    if (!enabled) {
      setText("");
      setPhase("typing");
    }
  }, [enabled]);

  function playClick() {
    if (!enabled) return;
    if (document.hidden) return;
    if (!audioEnabled.current) return;

    const ctx = audioCtx.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.value = 900 + Math.random() * 250;

    gain.gain.value = 0.02;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + 0.025
    );

    osc.stop(ctx.currentTime + 0.025);
  }

  /**
   * Typing loop.
   */
  useEffect(() => {
    if (!enabled) return;

    let timer: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "typing":
        if (text.length < currentWord.length) {
          timer = setTimeout(() => {
            playClick();
            setText(currentWord.slice(0, text.length + 1));
          }, 30 + Math.random() * 30);
        } else {
          timer = setTimeout(() => {
            setPhase("pause");
          }, 1500);
        }
        break;

      case "pause":
        timer = setTimeout(() => {
          setPhase("deleting");
        }, 150);
        break;

      case "deleting":
        if (text.length > 0) {
          timer = setTimeout(() => {
            setText(text.slice(0, -1));
          }, 18);
        } else {
          timer = setTimeout(() => {
            setWordIndex((i) => (i + 1) % words.length);
            setPhase("typing");
          }, 120);
        }
        break;
    }

    return () => clearTimeout(timer);
  }, [text, phase, currentWord, words.length, enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <span className="inline-flex items-center">
      {text}

      <span
        className="
          ml-1
          text-white
          animate-pulse
          drop-shadow-[0_0_8px_rgba(255,255,255,.8)]
        "
      >
        ▋
      </span>
    </span>
  );
}