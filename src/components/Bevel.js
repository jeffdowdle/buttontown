import styled from "styled-components";
import cssBevel from "../utils/cssBevel";

const Bevel = styled.div.attrs(({ inset, widthPx, theme }) => ({
  bevelWidthPx: widthPx || theme.mainBevelWidth,
  inset: inset,
  baseColor: theme.colorScheme.base,
  shadowColor: theme.colorScheme.shadow,
  highlightColor: theme.colorScheme.highlight
}))`
  width: 100%;
  height: 100%;

  background: ${props => props.baseColor};

  ${props =>
    cssBevel({
      bevelWidthPx: props.bevelWidthPx,
      inset: props.inset,
      shadowColor: props.shadowColor,
      highlightColor: props.highlightColor
    })}
`;

export default Bevel;
