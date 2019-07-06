import React from "react";
import styled from "styled-components";
import { IBlockConfig } from "../interfaces";
import Block from "../components/Block";
import Bevel from "../components/Bevel";

export const blockConfig: IBlockConfig = {
  id: "display",
  sizes: [
    {
      w: 1,
      h: 1,
      inputPositions: [
        {
          inputId: "input1",
          x: 1,
          y: 0
        }
      ]
    },
    {
      w: 3,
      h: 2,
      inputPositions: [
        {
          inputId: "input1",
          x: 1,
          y: -1
        }
      ]
    }
  ],
  inputs: [
    {
      id: "input1",
      name: "exampleInput",
      defaultValue: 0.8
    }
  ]
};

const Screen = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background: black;
`;

const Display = ({ inputs }) => {
  return (
    <Block>
      <Bevel>
        <Screen>{inputs.exampleInput}</Screen>
      </Bevel>
    </Block>
  );
};

export default Display;
