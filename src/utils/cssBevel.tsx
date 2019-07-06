const cssBevel = ({
  inset = false,
  bevelWidthPx = 1,
  shadowColor,
  highlightColor
}) => {
  return `
  border-width: ${bevelWidthPx}px;
  border-style: solid;

  border-left-color: ${inset ? shadowColor : highlightColor};
  border-top-color: ${inset ? shadowColor : highlightColor};
  border-right-color: ${inset ? highlightColor : shadowColor};
  border-bottom-color: ${inset ? highlightColor : shadowColor};
`;
};

export default cssBevel;
