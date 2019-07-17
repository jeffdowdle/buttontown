const widgetNames = [
  "Button",
  "Slider",
  "Level",
  "RGBColor",
  "DigitalClock",
  "NightModeToggle"
];

const widgets: any = widgetNames.reduce((acc, name) => {
  const w = require(`./widgets/${name}.widget`);
  acc[w.blockConfig.id] = {
    Component: w.default,
    blockConfig: w.blockConfig
  };
  return acc;
}, {});

export default widgets;
