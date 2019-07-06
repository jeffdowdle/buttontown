export const theme = {
  gapColor: "black",
  gapWidthPx: 1,
  mainBevelWidth: 9,
  colors: {
    black: "black",
    white: "white",
    red: "red",
    orange: "orange",
    yellow: "yellow",
    blue: "blue",
    green: "green",
    purple: "purple"
  },
  illuminated: {
    white: "white",
    torquoise: "#00ffc5"
  },
  colorScheme: {
    base: "#73AEBD",
    shadow: "#396D92",
    highlight: "#9EFFBE"
  }
};

export const colorSchemes = [
  {
    base: "#d16fda",
    shadow: "#8848ad",
    highlight: "#9EFFBE"
  },
  {
    base: "#73AEBD",
    shadow: "#396D92",
    highlight: "#9EFFBE"
  },
  {
    base: "#5fd999",
    shadow: "#009670",
    highlight: "#9EFFBE"
  }
];

export const nightModeScheme = {
  base: "#180039",
  shadow: "#0D0020",
  highlight: "#301654"
};

export const getRandomColorScheme = () => {
  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
};
