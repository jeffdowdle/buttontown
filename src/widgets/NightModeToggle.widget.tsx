import React, { useContext } from "react";
import styled from "styled-components";
import { IBlockConfig, GlobalsActionTypes } from "../interfaces";
import { GlobalsContext } from "..";
import BevelledButton from "../components/BevelledButton";
import Block from "../components/Block";

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
    <Block>
      <BevelledButton
        widthPx={9}
        as="button"
        type="button"
        onClick={() => {
          dispatch({ type: GlobalsActionTypes.ToggleNightMode });
        }}
      >
        <svg width="46px" height="46px" viewBox="0 0 46 46" version="1.1">
          <path
            d="M26.1281274,1 C18.7822718,6.06301262 15.07081,15.5234688 17.5605156,24.8151766 C20.3138128,35.0906218 29.7380107,41.752918 39.73907,41.1896509 C37.8064559,42.521674 35.6222842,43.5493244 33.2332956,44.1894519 C21.7637743,47.2627009 9.91659116,40.2399475 6.77187131,28.5036932 C3.62715145,16.7674389 10.3757364,4.76196452 21.8452576,1.68871557 C23.2728665,1.30618892 24.7063264,1.08007689 26.1281274,1 L26.1281274,1 Z"
            fill="#000000"
          />
        </svg>
      </BevelledButton>
    </Block>
  );
};

export default NightModeToggle;
