import Lenis from "lenis";

export const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    syncTouch: false,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
};