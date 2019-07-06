import React from "react";
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
import { GridContext } from "..";
import Grid from "../grid/Grid";
import { viewportWidth, viewportHeight } from "../utils/viewport";
import { createGrid } from "../grid/gridPlacement";
import useKeyPress from "../utils/useKeypress";

const CELL_SIZE = 80;
const GRID_WIDTH = Math.ceil(viewportWidth() / CELL_SIZE);
const GRID_HEIGHT = Math.ceil(viewportHeight() / CELL_SIZE);
const gridData = createGrid(GRID_WIDTH, GRID_HEIGHT);

const GridPage = () => {
  const spaceDown = useKeyPress("Shift");

  return (
    <div
      style={{
        overflow: "hidden",
        width: `100vw`,
        height: `100vh`
      }}
    >
      <ReactPanZoom enablePan={spaceDown}>
        <GridContext.Provider
          value={{
            cellSize: CELL_SIZE,
            gridWidth: GRID_WIDTH,
            gridHeight: GRID_HEIGHT
          }}
        >
          <Grid gridData={gridData} />
        </GridContext.Provider>
      </ReactPanZoom>
    </div>
  );
};

export default GridPage;
