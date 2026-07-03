import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  framePath: (i: number) => string;
}

export function SamuraiScrollCanvas({ scrollYProgress, totalFrames, framePath }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;
    let cancelled = false;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoaded(loadedCount);
        // First image loaded — now that we know source dimensions, size the
        // backing store to native resolution.
        if (loadedCount === 1) resize();
        if (loadedCount === 20 && !cancelled) {
          setReady(true);
          draw(currentFrameRef.current);
        }
        if (loadedCount === totalFrames) setReady(true);
      };
      img.onerror = () => {
        loadedCount++;
        setLoaded(loadedCount);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames]);

  // Effective DPR: capped so the backing store never exceeds the source
  // resolution in the fitted axis. This gives pixel-perfect rendering at
  // native sharpness — no upscale blur on 4K displays, no wasted pixels.
  const effectiveDpr = (clientWidth: number, clientHeight: number) => {
    const deviceDpr = window.devicePixelRatio || 1;
    const sample = imagesRef.current.find((i) => i.complete && i.naturalWidth > 0);
    if (!sample) return deviceDpr;
    const iw = sample.naturalWidth;
    const ih = sample.naturalHeight;
    const scale = Math.min(clientWidth / iw, clientHeight / ih);
    const displayedW = iw * scale;
    const displayedH = ih * scale;
    // How much backing-store density we could use before the browser has to
    // interpolate pixels that don't exist in the source.
    const maxNativeDpr = Math.min(iw / displayedW, ih / displayedH);
    return Math.max(1, Math.min(deviceDpr, maxNativeDpr));
  };

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { clientWidth, clientHeight } = canvas;
    const dpr = effectiveDpr(clientWidth, clientHeight);
    canvas.width = Math.floor(clientWidth * dpr);
    canvas.height = Math.floor(clientHeight * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    draw(currentFrameRef.current);
  };

  const draw = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = effectiveDpr(canvas.clientWidth, canvas.clientHeight);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    ctx.clearRect(0, 0, cw, ch);

    // object-fit: contain
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) * 1.45;
    const dy = (ch - dh) / 2;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(totalFrames - 1, Math.max(0, Math.round(p * (totalFrames - 1))));
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      draw(idx);
    }
  });

  const pct = Math.round((loaded / totalFrames) * 100);

  return (
    <>
      <canvas
  ref={canvasRef}
  className="absolute inset-0 h-full w-full"
  style={{ display: "block" }}
/>

<div
  className="pointer-events-none absolute inset-0"
  style={{
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.75) 100%)",
  }}
/>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-samurai-black">
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-40 bg-border overflow-hidden">
              <div
                className="h-full bg-bright-steel transition-[width] duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground">
              FORGING · {String(pct).padStart(3, "0")}%
            </span>
          </div>
        </div>
      )}
    </>
  );
}
