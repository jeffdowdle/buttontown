import React from "react";
import styled from "styled-components";
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

const DigitalClock = ({ inputs }) => {
  const timeMillis = useTime();
  const dateTime = new Date(timeMillis);

  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const first = nthDigit(hours, 2);
  const second = nthDigit(hours, 1);

  const third = nthDigit(minutes, 2);
  const fourth = nthDigit(minutes, 1);

  console.log(hours, minutes, first, second, third, fourth);

  return (
    <Screen>
      <ScreenInner>
        <div>
          <Digit litColor="red" value={first} />
          <Digit value={second} />
          <Digit value={third} />
          <Digit value={fourth} />
          {/* {dateTime.getHours()}:{dateTime.getMinutes()} */}
        </div>
      </ScreenInner>
    </Screen>
  );
};

export default DigitalClock;
