import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IBlockConfig, BlockRatio } from "../interfaces";
import { getBlockRatio } from "../grid/blockConfigUtils";
import Block from "../components/Block";
import Bevel from "../components/Bevel";
import Spacer from "../components/Spacer";

export const blockConfig: IBlockConfig = {
  id: "level",
  sizes: [
    {
      w: 1,
      h: "fluid",
      inputPositions: [
        {
          inputId: "value",
          x: 0,
          y: -1
        }
      ]
    },
    {
      w: "fluid",
      h: 1,
      inputPositions: [
        {
          inputId: "value",
          x: -1,
          y: 0
        }
      ]
    }
  ],
  inputs: [
    {
      id: "value",
      name: "value",
      defaultValue: 0.5
    }
  ]
};

const BarContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;
  background: black;
`;

const BarVertical = styled.div.attrs(({ value }) => ({
  style: {
    transform: `scaleY(${value})`
  }
}))`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.illuminated.torquoise};
  transform-origin: bottom;
`;

const BarHorizontal = styled.div.attrs(({ value }) => ({
  style: {
    transform: `scaleX(${value})`
  }
}))`
  width: 100%;
  height: 100%;
  color: white;
  background: #00ffc5;
  transform-origin: left;
`;

const Level = ({ inputs, dimensions }) => {
  const { value } = inputs;
  const blockRatio = getBlockRatio(dimensions);

  let BarComponent;

  switch (blockRatio) {
    case BlockRatio.Square:
    case BlockRatio.Vertical:
      BarComponent = BarVertical;
      break;
    case BlockRatio.Horizontal:
      BarComponent = BarHorizontal;
      break;
  }

  return (
    <Block>
      <Bevel>
        <Spacer widthPx={2}>
          <Bevel widthPx={2} inset>
            <BarContainer>
              <BarComponent value={value} />
            </BarContainer>
          </Bevel>
        </Spacer>
      </Bevel>
    </Block>
  );
};

export default Level;
