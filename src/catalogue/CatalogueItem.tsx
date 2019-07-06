import React, { useContext, useState } from "react";
import styled from "styled-components";
import Grid from "../grid/Grid";
import widgets from "../widgets";
import { getSizes } from "../grid/blockConfigUtils";
import WidgetSandbox from "./WidgetSandbox";

const ItemContainer = styled.div`
  display: grid;
  /* grid-template-columns: 300px 1fr; */
  grid-template-rows: 400px auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    "sandbox"
    "details";

  height: 100vh;
`;

const SandboxArea = styled.div`
  grid-area: sandbox;
  background: white;
`;

const DetailsArea = styled.div`
  grid-area: details;
  background: #eee;

  padding: 20px;
`;

const CatalogueItem = ({ widgetId }) => {
  const widget = widgets[widgetId];
  const blockConfig = widget.blockConfig;

  const sizes = getSizes(blockConfig);

  const [currentSize, setCurrentSize] = useState(
    sizes.length ? sizes[0] : { w: "fluid", h: "fluid" }
  );

  return (
    <ItemContainer>
      <SandboxArea>
        <WidgetSandbox widget={widget} w={currentSize.w} h={currentSize.h} />
      </SandboxArea>
      <DetailsArea>
        <h2>{widgetId}</h2>
        <h3>Sizes</h3>
        <ul>
          {sizes.map(s => {
            const sizeString = `${s.w}x${s.h}`;

            return (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentSize(s);
                  }}
                >
                  {sizeString}
                </button>
              </li>
            );
          })}
        </ul>
      </DetailsArea>
    </ItemContainer>
  );
};

export default CatalogueItem;
