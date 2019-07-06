const widgetNames = [
  "Button",
  "Display",
  "Slider",
  "Level",
  "RGBColor",
  "DigitalClock",
  "NightModeToggle"
];

const widgets = widgetNames.reduce((acc, name) => {
  const w = require(`./widgets/${name}.widget`);
  acc[w.blockConfig.id] = {
    Component: w.default,
    blockConfig: w.blockConfig
  };
  return acc;
}, {});

export default widgets;
