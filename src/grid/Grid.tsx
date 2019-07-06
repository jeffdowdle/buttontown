import React, { useContext } from "react";
import styled from "styled-components";
import { createGrid, width, height } from "./gridPlacement";
import { viewportWidth, viewportHeight } from "../utils/viewport";
import Cell from "./Cell";
import DebugCell from "./DebugCell";
import { GridContext, AppContext } from "..";

const GridWrapper = styled.div`
  position: relative;
`;

const Grid = ({ gridData }) => {
  const { gridWidth, gridHeight, cellSize } = useContext(GridContext);

  const { isDebugMode } = useContext(AppContext);

  return (
    <GridWrapper
      style={{
        width: `${gridWidth * cellSize}px`,
        height: `${gridHeight * cellSize}px`
      }}
    >
      {gridData.map(cell => (
        <Cell
          dimensions={{
            x: cell.x1,
            y: cell.y1,
            width: cell.width,
            height: cell.height
          }}
          widget={cell.widget}
        />
      ))}

      {isDebugMode &&
        gridData.map(cell => (
          <DebugCell
            dimensions={{
              x: cell.x1,
              y: cell.y1,
              width: cell.width,
              height: cell.height
            }}
            widget={cell.widget}
          />
        ))}
    </GridWrapper>
  );
};

export default Grid;
