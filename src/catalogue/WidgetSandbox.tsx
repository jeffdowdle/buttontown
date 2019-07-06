import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "../grid/Grid";
import widgets from "../widgets";
import { getSizes } from "../grid/blockConfigUtils";
import { GridContext } from "..";

const Container = styled.div`
  padding: 20px;
`;

const WidgetSandbox = ({ widget, w, h }) => {
  const blockConfig = widget.blockConfig;

  const [currentWidth, setCurrentWidth] = useState(w !== "fluid" ? w : 1);
  const [currentHeight, setCurrentHeight] = useState(h !== "fluid" ? h : 1);

  useEffect(() => {
    setCurrentWidth(w !== "fluid" ? w : 1);
    setCurrentHeight(h !== "fluid" ? h : 1);
  }, [w, h]);

  const gridData = [
    {
      x1: 0,
      y1: 0,
      width: currentWidth,
      height: currentHeight,
      widget: widget
    }
  ];

  return (
    <Container>
      <h3>
        Preview - {w}x{h}
      </h3>

      <div>
        <input
          type="number"
          value={currentWidth}
          disabled={w !== "fluid"}
          onChange={e => {
            setCurrentWidth(e.target.value);
          }}
        />
        x
        <input
          type="number"
          value={currentHeight}
          disabled={h !== "fluid"}
          onChange={e => {
            setCurrentHeight(e.target.value);
          }}
        />
      </div>

      <GridContext.Provider
        value={{
          cellSize: 80,
          gridWidth: currentWidth,
          gridHeight: currentHeight
        }}
      >
        <Grid gridData={gridData} />
      </GridContext.Provider>
    </Container>
  );
};

export default WidgetSandbox;
