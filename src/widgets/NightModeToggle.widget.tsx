import React, { useContext } from "react";
import styled from "styled-components";
import { IBlockConfig, GlobalsActionTypes } from "../interfaces";
import { GlobalsContext } from "..";

export const blockConfig: IBlockConfig = {
  id: "nightModeToggle",
  sizes: [
    {
      w: 1,
      h: 1,
      inputPositions: []
    }
  ],
  inputs: []
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

const InnerButton = styled.button`
  width: calc(100%);
  height: calc(100%);
  border-left: 8px solid #fff;
  border-top: 8px solid #fff;
  border-right: 8px solid #777;
  border-bottom: 8px solid #777;
  background: #aaa;
`;

const NightModeToggle = ({}) => {
  const {
    state: { isNightMode },
    dispatch
  } = useContext(GlobalsContext);

  return (
    <Wrapper>
      <InnerButton
        type="button"
        onClick={() => {
          dispatch({ type: GlobalsActionTypes.ToggleNightMode });
        }}
      >
        Toggle night
      </InnerButton>
    </Wrapper>
  );
};

export default NightModeToggle;
