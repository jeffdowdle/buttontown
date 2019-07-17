import Bevel from "./Bevel";
import styled from "styled-components";
import cssBevel from "../utils/cssBevel";

const BevelledButton = styled(Bevel)`
  outline: none;
  cursor: pointer;

  &:active {
    ${props =>
      cssBevel({
        bevelWidthPx: 9,
        inset: true,
        shadowColor: props.theme.colorScheme.shadow,
        highlightColor: props.theme.colorScheme.highlight
      })}
  }
`;

export default BevelledButton;
