import React from "react";
import styled, { withTheme } from "styled-components";
import { IBlockConfig } from "../interfaces";
import { useTime } from "../utils/useTime";
import Bevel from "../components/Bevel";
import Block from "../components/Block";
import Digit from "../components/Digit";

export const blockConfig: IBlockConfig = {
  id: "digitalClock",
  sizes: [
    {
      w: 2,
      h: 1,
      inputPositions: []
    }
  ],
  inputs: []
};

const Screen = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  padding: 4px;
`;

const ScreenInner = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  border: 1px solid ${props => props.theme.illuminated.torquoise};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.illuminated.torquoise};
  font-size: 54px;
`;

const nthDigit = (value, n) => {
  return Math.floor(value / Math.pow(10, n - 1)) % 10;
};

const Seperator = ({ onColor }) => {
  return (
    <svg width="9px" height="33px" viewBox="0 0 9 33" version="1.1">
      <polygon
        fill={onColor}
        points="3.19744231e-14 32.86 0.507272727 26.9981818 6.42545455 26.9981818 5.91818182 32.86"
      />
      <polygon
        fill={onColor}
        points="2.36727273 5.86181818 2.87454545 -4.97379915e-14 8.79272727 -4.97379915e-14 8.28545455 5.86181818"
      />
    </svg>
  );
};

const DigitalClock = ({ inputs, theme }) => {
  const timeMillis = useTime();
  const dateTime = new Date(timeMillis);

  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const first = nthDigit(hours, 2);
  const second = nthDigit(hours, 1);

  const third = nthDigit(minutes, 2);
  const fourth = nthDigit(minutes, 1);

  const onColor = theme.illuminated.torquoise;
  const offColor = "#003529";

  return (
    <Screen>
      <ScreenInner>
        <div>
          <Digit onColor={onColor} offColor={offColor} value={first} />
          <Digit onColor={onColor} offColor={offColor} value={second} />
          <Seperator onColor={onColor} />
          <Digit onColor={onColor} offColor={offColor} value={third} />
          <Digit onColor={onColor} offColor={offColor} value={fourth} />
        </div>
      </ScreenInner>
    </Screen>
  );
};

export default withTheme(DigitalClock);
