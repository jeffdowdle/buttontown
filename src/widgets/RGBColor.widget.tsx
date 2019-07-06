import React from "react";
import styled from "styled-components";
import { IBlockConfig } from "../interfaces";
import { mapToRange } from "../utils/general";
import Bevel from "../components/Bevel";
import Block from "../components/Block";

export const blockConfig: IBlockConfig = {
  id: "rgbColor",
  sizes: [
    {
      w: 1,
      h: 1,
      inputPositions: [
        {
          inputId: "red",
          x: -1,
          y: 0
        },
        {
          inputId: "green",
          x: 0,
          y: 1
        },
        {
          inputId: "blue",
          x: 1,
          y: 0
        }
      ]
    }
  ],
  inputs: [
    {
      id: "red",
      name: "red",
      defaultValue: 0
    },
    {
      id: "green",
      name: "green",
      defaultValue: 0
    },
    {
      id: "blue",
      name: "blue",
      defaultValue: 0
    }
  ]
};

const mapTo256 = mapToRange(0)(255)(0)(1);

const Color = styled.div.attrs(({ red, green, blue }) => ({
  style: {
    background: `rgb(${mapTo256(red)}, ${mapTo256(green)}, ${mapTo256(blue)})`
  }
}))`
  width: 100%;
  height: 100%;
  background: black;
`;

const RGBColor = ({ inputs }) => {
  return (
    <Block>
      <Bevel>
        <Color red={inputs.red} green={inputs.green} blue={inputs.blue} />
      </Bevel>
    </Block>
  );
};

export default RGBColor;
