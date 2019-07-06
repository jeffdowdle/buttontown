import React, { useContext } from "react";
import styled from "styled-components";
import { IBlockConfig } from "../interfaces";
import { GlobalsContext } from "..";
import Block from "../components/Block";
import Bevel from "../components/Bevel";
import cssBevel from "../utils/cssBevel";

export const blockConfig: IBlockConfig = {
  id: "button",
  sizes: [
    {
      w: "fluid",
      h: "fluid",
      inputPositions: []
    }
  ],
  inputs: []
};

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

const Button = ({ colorScheme }) => {
  const {
    state: { isNightMode }
  } = useContext(GlobalsContext);

  return (
    <Block>
      <BevelledButton widthPx={9} as="button" type="button">
        {/* PRESS */}
      </BevelledButton>
    </Block>
  );
};

export default Button;
