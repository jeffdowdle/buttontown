export const mapToRange = tgtMin => tgtMax => srcMin => srcMax => value => {
  return ((value - srcMin) * (tgtMax - tgtMin)) / (srcMax - srcMin) + tgtMin;
};
