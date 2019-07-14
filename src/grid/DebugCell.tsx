import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "..";
import styled from "styled-components";
import { IWidget, ICellDimensions } from "../interfaces";
import { matchesSize, getBlockRatio } from "./blockConfigUtils";

const BLOCK_INPUT_EVENT = "blockInputEvent";

enum Direction {
  Top,
  Bottom,
  Left,
  Right,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight
}

const CellNumber = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 10px;
  font-family: sans-serif;
  font-weight: bold;
  padding: 3px;
  position: absolute;
  top: 0;
  left: 0;
`;

const InputIndicator = styled.div`
  background: #0f0;
  width: 10px;
  height: 10px;
  position: absolute;
`;

const CellWrapper = styled.div`
  position: absolute;
  display: block;
  border: 1px solid #0f0;
  pointer-events: none;
`;

export interface Props {
  widget: IWidget;
  dimensions: ICellDimensions;
}
const DebugCell = ({ widget, dimensions }) => {
  const { cellSize } = useContext(GridContext);

  const blockRatio = getBlockRatio(dimensions);

  useEffect(() => {
    const onBlockOutputChange = e => {
      const { origin, value } = e.detail;
    };

    window.addEventListener(BLOCK_INPUT_EVENT, onBlockOutputChange, true);

    return () => {
      window.removeEventListener(BLOCK_INPUT_EVENT, onBlockOutputChange, true);
    };
  }, []);

  return (
    <CellWrapper
      style={{
        top: `${dimensions.y * cellSize}px`,
        left: `${dimensions.x * cellSize}px`,
        width: `${dimensions.width * cellSize}px`,
        height: `${dimensions.height * cellSize}px`
      }}
    >
      <CellNumber>
        ({dimensions.x}, {dimensions.y}) {blockRatio}
      </CellNumber>
      {widget.blockConfig.inputs.map(input => {
        const size = widget.blockConfig.sizes.find(s =>
          matchesSize(dimensions, s)
        );
        const pos = size.inputPositions.find(p => p.inputId === input.id);

        let direction: Direction | null = null;

        if (pos.x < 0) {
          if (pos.y < 0) {
            direction = Direction.TopLeft;
          } else if (pos.y >= dimensions.height) {
            direction = Direction.BottomLeft;
          } else {
            direction = Direction.Left;
          }
        } else if (pos.x >= dimensions.width) {
          if (pos.y < 0) {
            direction = Direction.TopRight;
          } else if (pos.y >= dimensions.height) {
            direction = Direction.BottomRight;
          } else {
            direction = Direction.Right;
          }
        } else {
          if (pos.y < 0) {
            direction = Direction.Top;
          } else if (pos.y >= dimensions.height) {
            direction = Direction.Bottom;
          }
        }

        let style = {};
        switch (direction) {
          case Direction.TopLeft:
            style = {
              top: `0px`,
              left: `0px`
            };
            break;
          case Direction.BottomLeft:
            style = {
              bottom: `0px`,
              left: `0px`
            };
            break;
          case Direction.Left:
            style = {
              top: `${pos.y * cellSize + cellSize / 2}px`,
              left: `0px`
            };
            break;
          case Direction.TopRight:
            style = {
              top: `0px`,
              right: `0px`
            };
            break;
          case Direction.TopRight:
            style = {
              bottom: `0px`,
              right: `0px`
            };
            break;
          case Direction.Right:
            style = {
              top: `${pos.y * cellSize + cellSize / 2}px`,
              right: `0px`
            };
            break;
          case Direction.Top:
            style = {
              top: `0px`,
              left: `${pos.x * cellSize + cellSize / 2}px`
            };
            break;
          case Direction.Bottom:
            style = {
              bottom: `0px`,
              left: `${pos.x * cellSize + cellSize / 2}px`
            };
            break;
        }

        return <InputIndicator style={style} />;
      })}
    </CellWrapper>
  );
};

export default DebugCell;
