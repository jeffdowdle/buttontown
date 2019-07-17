import React from "react";
import { IBlockConfig } from "../interfaces";
import Block from "../components/Block";
import BevelledButton from "../components/BevelledButton";

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

const Button = ({ colorScheme }) => {
  return (
    <Block>
      <BevelledButton widthPx={9} as="button" type="button" />
    </Block>
  );
};

export default Button;
