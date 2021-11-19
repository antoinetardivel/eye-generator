const randomRGBA = (): number[] => {
  const o = Math.round,
    r = Math.random,
    s = 255;
  return [o(r() * s), o(r() * s), o(r() * s), parseInt(r().toFixed(1), 10)];
};
export default randomRGBA;
