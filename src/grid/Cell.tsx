import React, { useContext, useEffect, useState, useMemo } from "react";
import { GridContext, GlobalsContext } from "..";
import styled, { ThemeProvider } from "styled-components";
import { ICellDimensions, IWidget } from "../interfaces";
import { matchesSize } from "./blockConfigUtils";
import { getRandomColorScheme, nightModeScheme } from "../baseTheme";

const BLOCK_INPUT_EVENT = "blockInputEvent";

const pointInArea = (pX, pY, aX, aY, aW, aH) => {
  return pX >= aX && pX < aX + aW && pY >= aY && pY < aY + aH;
};

const dispatchOutputEvent = (value: any, origin: ICellDimensions) => {
  const detail = {
    value,
    origin
  };
  const event = new CustomEvent(BLOCK_INPUT_EVENT, { detail });
  window.dispatchEvent(event);
};

const CellWrapper = styled.div`
  position: absolute;
  display: block;
`;

export interface Props {
  widget: IWidget;
  dimensions: ICellDimensions;
}
const Cell = ({ widget, dimensions }: Props) => {
  const defaultInputs = widget.blockConfig.inputs.reduce((values, input) => {
    return {
      ...values,
      [input.name]: input.defaultValue
    };
  }, {});

  const [inputs, setInputs] = useState(defaultInputs);

  const defaultOutput =
    typeof widget.blockConfig.output !== "undefined"
      ? widget.blockConfig.output.defaultValue
      : undefined;
  const [output, setOutput] = useState(defaultOutput);
  const { cellSize } = useContext(GridContext);

  useEffect(() => {
    const onBlockInputEvent = e => {
      const { origin, value } = e.detail;

      const sizeObj = widget.blockConfig.sizes.find(s =>
        matchesSize(dimensions, s)
      );

      if (!sizeObj) {
        return;
      }

      const matchingInput = sizeObj.inputPositions.find(pos => {
        const absX = dimensions.x + pos.x;
        const absY = dimensions.y + pos.y;

        return pointInArea(
          absX,
          absY,
          origin.x,
          origin.y,
          origin.width,
          origin.height
        );
      });

      if (!matchingInput) {
        return;
      }
      const matchingInputId = matchingInput.inputId;

      const input = (widget.blockConfig.inputs || []).find(
        inp => inp.id === matchingInputId
      );

      if (input) {
        setInputs(prevState => ({
          ...prevState,
          [input.name]: value
        }));
      }
    };

    window.addEventListener(BLOCK_INPUT_EVENT, onBlockInputEvent, true);

    return () => {
      window.removeEventListener(BLOCK_INPUT_EVENT, onBlockInputEvent, true);
    };
  }, []);

  useEffect(() => {
    if (typeof widget.blockConfig.output !== "undefined") {
      setTimeout(() => {
        dispatchOutputEvent(output, dimensions);
      }, 0);
    }
  }, []);

  const onChangeOutput = value => {
    setOutput(value);
    dispatchOutputEvent(value, dimensions);
  };

  const {
    state: { isNightMode }
  } = useContext(GlobalsContext);

  let colorScheme = useMemo(() => getRandomColorScheme(), []);

  if (isNightMode) {
    colorScheme = nightModeScheme;
  }

  return (
    <ThemeProvider
      theme={{
        colorScheme
      }}
    >
      <CellWrapper
        style={{
          top: `${dimensions.y * cellSize}px`,
          left: `${dimensions.x * cellSize}px`,
          width: `${dimensions.width * cellSize}px`,
          height: `${dimensions.height * cellSize}px`
        }}
      >
        {
          <widget.Component
            dimensions={dimensions}
            inputs={inputs}
            colorScheme={colorScheme}
            outputValue={output}
            onOutput={onChangeOutput}
          />
        }
      </CellWrapper>
    </ThemeProvider>
  );
};

export default Cell;
