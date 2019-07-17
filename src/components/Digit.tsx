import React from "react";

const segmentMap = {
  top: [0, 2, 3, 5, 6, 7, 8, 9],
  middle: [2, 3, 4, 5, 6, 8, 9],
  bottom: [0, 2, 3, 5, 6, 8, 9],
  topLeft: [0, 4, 5, 6, 8, 9],
  bottomLeft: [0, 2, 6, 8],
  topRight: [0, 1, 2, 3, 4, 7, 8, 9],
  bottomRight: [0, 1, 3, 4, 5, 6, 7, 8, 9]
};

interface Props {
  value: number;
  onColor: string;
  offColor: string;
}
const Digit = ({ value, onColor, offColor }: Props) => {
  // const color = color(value);
  const color = segment => {
    const isLit = (segmentMap[segment] || []).indexOf(value) >= 0;

    return isLit ? onColor : offColor;
  };

  return (
    <svg width="29px" height="40px" viewBox="0 0 29 40" version="1.1">
      <g
        id="Digit"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <polygon
          fill={color("top")}
          points="28 0 21.5668317 6 10.4084158 6 5 0"
        />
        <polygon
          fill={color("bottom")}
          points="24 40 1 40 7.43316832 34 18.5915842 34"
        />
        <polygon
          fill={color("bottomLeft")}
          points="7 24.5645161 6.328 32.2967742 0 38 1.288 23.1387097 3.696 21"
        />
        <polygon
          fill={color("topLeft")}
          points="2 16.6848875 3.36440678 1 9 7.0192926 8.28813559 15.1800643 4.07627119 19"
        />
        <polygon
          fill={color("bottomRight")}
          points="27 23.1387097 25.6355932 38 20 32.2967742 20.7118644 24.5645161 24.9237288 21"
        />
        <polygon
          fill={color("topRight")}
          points="22 15.1800643 22.672 7.0192926 29 1 27.712 16.6848875 25.304 19"
        />
        <polygon
          fill={color("middle")}
          points="20.3496933 17 23 20 19.8527607 23 7.59509202 23 5 20 8.09202454 17"
        />
      </g>
    </svg>
  );
};

export default Digit;
