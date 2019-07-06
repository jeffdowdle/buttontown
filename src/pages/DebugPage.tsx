import React from "react";
import Grid from "../grid/Grid";
import widgets from "../widgets";
import { GridContext } from "..";

const gridData1 = [
  // {
  //   x1: 0,
  //   y1: 0,
  //   width: 1,
  //   height: 1,
  //   widget: widgets.slider
  // },
  // {
  //   x1: 1,
  //   y1: 0,
  //   width: 1,
  //   height: 1,
  //   widget: widgets.slider
  // },
  // {
  //   x1: 2,
  //   y1: 0,
  //   width: 1,
  //   height: 1,
  //   widget: widgets.slider
  // },
  {
    x1: 0,
    y1: 1,
    width: 1,
    height: 1,
    widget: widgets.slider
  },
  {
    x1: 1,
    y1: 1,
    width: 1,
    height: 1,
    widget: widgets.rgbColor
  },
  {
    x1: 2,
    y1: 1,
    width: 1,
    height: 4,
    widget: widgets.slider
  },
  {
    x1: 2,
    y1: 5,
    width: 1,
    height: 1,
    widget: widgets.level
  }
  // {
  //   x1: 1,
  //   y1: 2,
  //   width: 1,
  //   height: 1,
  //   widget: widgets.slider
  // },

  // {
  //   x1: 2,
  //   y1: 2,
  //   width: 1,
  //   height: 1,
  //   widget: widgets.slider
  // }
];

const DebugPage = () => {
  return (
    <GridContext.Provider
      value={{
        cellSize: 80,
        gridWidth: 3,
        gridHeight: 3
      }}
    >
      <Grid gridData={gridData1} />
    </GridContext.Provider>
  );
};

export default DebugPage;
