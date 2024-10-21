export const scrollSequenceImages = Array.from({ length: 351 }, (_, i) =>
  require(`./images/image${String(i + 1).padStart(3, '0')}.webp`)
);