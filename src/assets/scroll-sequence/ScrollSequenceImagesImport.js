export const scrollSequenceImages = Array.from({ length: 230 }, (_, i) =>
  require(`./images-low/image${String(i + 1).padStart(3, '0')}.webp`)
);