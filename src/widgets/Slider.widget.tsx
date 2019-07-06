import React, { useState, useContext } from "react";
import styled from "styled-components";
import { IBlockConfig, BlockRatio } from "../interfaces";
import Block from "../components/Block";
import Bevel from "../components/Bevel";
import { getBlockRatio } from "../grid/blockConfigUtils";
import { GridContext } from "..";
import cssBevel from "../utils/cssBevel";

export const blockConfig: IBlockConfig = {
  id: "slider",
  output: {
    defaultValue: 0.2
  },
  sizes: [
    {
      w: 1,
      h: "fluid",
      inputPositions: []
    },
    {
      w: "fluid",
      h: 1,
      inputPositions: []
    }
  ],
  inputs: []
};

const bevelWidth = 8;
const horizontalTrack = props => `
  height: 12px;
  background: ${props.theme.colors.black};

  ${cssBevel({
    bevelWidthPx: 2,
    inset: true,
    shadowColor: props.theme.colorScheme.shadow,
    highlightColor: props.theme.colorScheme.highlight
  })}
`;

const horizontalThumb = props => `
  background-color: blue;
  width: 18px;
  height: 54px;
  margin-top: -23px;
  
  background: ${props.theme.colorScheme.base};
  box-shadow: 0px 0px 0px 1px ${props.theme.colors.black};
  
  ${cssBevel({
    bevelWidthPx: 4,
    inset: false,
    shadowColor: props.theme.colorScheme.shadow,
    highlightColor: props.theme.colorScheme.highlight
  })}
`;

const HorizontalRangeInput = styled.input`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  /* width: 100%; Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */

  width: ${props =>
    props.dimensions.width * props.cellSize -
    bevelWidth * 2 -
    props.theme.gapWidthPx * 2 -
    4}px;

  margin-left: 2px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-webkit-slider-runnable-track {
    ${horizontalTrack}
  }
  &::-moz-range-track {
    ${horizontalTrack}
  }
  &::-ms-track {
    ${horizontalTrack}
  }

  &::-webkit-slider-thumb {
    ${horizontalThumb}
  }

  &::-moz-range-thumb {
    ${horizontalThumb}
  }

  &::-ms-thumb {
    ${horizontalThumb}
  }
`;

const verticalTrack = props => `
  border-left-color: ${props.theme.colorScheme.highlight};
  border-top-color: ${props.theme.colorScheme.shadow};
  border-right-color: ${props.theme.colorScheme.shadow};
  border-bottom-color: ${props.theme.colorScheme.highlight};
`;

const verticalThumb = props => `
  border-left-color: ${props.theme.colorScheme.shadow};
  border-top-color: ${props.theme.colorScheme.highlight};
  border-right-color: ${props.theme.colorScheme.highlight};
  border-bottom-color: ${props.theme.colorScheme.shadow};
`;

const VerticalRangeInput = styled(HorizontalRangeInput).attrs(props => {
  const width =
    props.dimensions.height * props.cellSize -
    bevelWidth * 2 -
    props.theme.gapWidthPx * 2 -
    4;

  return {
    width
  };
})`
  width: ${props => props.width}px;
  margin-left: 0;
  transform-origin: right;
  transform: translate(-${props => props.width}px, 2px) rotate(-90deg);

  &::-webkit-slider-runnable-track {
    ${verticalTrack}
  }
  &::-moz-range-track {
    ${verticalTrack}
  }
  &::-ms-track {
    ${verticalTrack}
  }

  &::-webkit-slider-thumb {
    ${verticalThumb}
  }

  &::-moz-range-thumb {
    ${verticalThumb}
  }

  &::-ms-thumb {
    ${verticalThumb}
  }
`;

const HorizontalRange = props => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%"
      }}
    >
      <HorizontalRangeInput {...props} />
    </div>
  );
};

const VerticalRange = props => {
  return (
    <div
      style={{
        transform: `translate(50%, -${bevelWidth}px)`
      }}
    >
      <VerticalRangeInput {...props} />
    </div>
  );
};

const Slider = ({ outputValue, onOutput, dimensions }) => {
  const { cellSize } = useContext(GridContext);
  const blockRatio = getBlockRatio(dimensions);

  let RangeComponent;

  switch (blockRatio) {
    case BlockRatio.Square:
    case BlockRatio.Vertical:
      RangeComponent = VerticalRange;
      break;
    case BlockRatio.Horizontal:
      RangeComponent = HorizontalRange;
      break;
  }

  return (
    <Block>
      <Bevel widthPx={bevelWidth}>
        <RangeComponent
          type="range"
          value={outputValue}
          min="0"
          max="1"
          step="0.01"
          cellSize={cellSize}
          dimensions={dimensions}
          onChange={e => {
            onOutput(e.target.value);
          }}
        />
      </Bevel>
    </Block>
  );
};

export default Slider;
