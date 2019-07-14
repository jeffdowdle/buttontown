import allWidgets from "../widgets";
import { matchesSize } from "./blockConfigUtils";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// export const width = cell => cell.x2 - cell.x1;
export const width = cell => cell.width;
// export const height = cell => cell.y2 - cell.y1;
export const height = cell => cell.height;
export const area = cell => width(cell) * height(cell);

const getWidgetNamesOfSize = (widgets = {}, w, h) => {
  return Object.keys(widgets).filter(name => {
    if (!widgets[name].blockConfig) {
      throw new Error(`No block config found on '${name}'`);
    }

    if (widgets[name].blockConfig.fluidSizing) {
      return true;
    }

    const matches = (widgets[name].blockConfig.sizes || []).filter(s => {
      return matchesSize({ width: w, height: h }, s);
    });

    return matches.length > 0;
  });
};

const chooseRandomWidget = cell => {
  const w = width(cell);
  const h = height(cell);
  const compatibleWidgetNames = getWidgetNamesOfSize(allWidgets, w, h);

  if (compatibleWidgetNames.length === 0) {
    throw new Error(`There are no widgets that can fit in an ${w}x${h} space`);
  }

  const selectedWidgetName =
    compatibleWidgetNames[
      Math.floor(Math.random() * compatibleWidgetNames.length)
    ];
  return allWidgets[selectedWidgetName];
};

const topLeft = (cell, splitX, splitY) => ({
  x1: cell.x1,
  y1: cell.y1,
  width: splitX,
  height: splitY
});

const topRight = (cell, splitX, splitY) => ({
  x1: cell.x1 + splitX,
  y1: cell.y1,
  width: cell.width - splitX,
  height: splitY
});

const bottomLeft = (cell, splitX, splitY) => ({
  x1: cell.x1,
  y1: cell.y1 + splitY,
  width: splitX,
  height: cell.height - splitY
});

const bottomRight = (cell, splitX, splitY) => ({
  x1: cell.x1 + splitX,
  y1: cell.y1 + splitY,
  width: cell.width - splitX,
  height: cell.height - splitY
});

const top2 = (cell, splitX, splitY) => ({
  x1: cell.x1,
  y1: cell.y1,
  width: cell.width,
  height: splitY
});

const bottom = (cell, splitX, splitY) => ({
  x1: cell.x1,
  y1: cell.y1 + splitY,
  width: cell.width,
  height: cell.height - splitY
});

const left = (cell, splitX, splitY) => ({
  x1: cell.x1,
  y1: cell.y1,
  width: splitX,
  height: cell.height
});

const right = (cell, splitX, splitY) => ({
  x1: cell.x1 + splitX,
  y1: cell.y1,
  width: cell.width - splitX,
  height: cell.height
});

const split = (cell, depth = 0) => {
  // if (depth < 1 || area(cell) <= 6) {
  //   return [cell];
  // }

  if (
    (area(cell) <= 6 && width(cell) > 1 && height(cell) > 1) ||
    (width(cell) === 1 && height(cell) <= 4) ||
    (height(cell) === 1 && width(cell) <= 4)
  ) {
    return [cell];
  }

  const splitX = getRandomIntInclusive(1, width(cell) - 1);
  const splitY = getRandomIntInclusive(1, height(cell) - 1);

  const canSplitX = width(cell) > 1;
  const canSplitY = height(cell) > 1;

  if (!canSplitX && !canSplitY) {
    return [cell];
  } else if (!canSplitX) {
    return [
      ...split(top2(cell, splitX, splitY), depth - 1),
      ...split(bottom(cell, splitX, splitY), depth - 1)
    ];
  } else if (!canSplitY) {
    return [
      ...split(left(cell, splitX, splitY), depth - 1),
      ...split(right(cell, splitX, splitY), depth - 1)
    ];
  } else {
    return [
      ...split(topLeft(cell, splitX, splitY), depth - 1),
      ...split(topRight(cell, splitX, splitY), depth - 1),
      ...split(bottomLeft(cell, splitX, splitY), depth - 1),
      ...split(bottomRight(cell, splitX, splitY), depth - 1)
    ];
  }
};

export const createGrid = (width, height) => {
  // const root = { x1: 0, y1: 0, x2: w - 1, y2: h - 1 };
  const root = { x1: 0, y1: 0, width, height };
  const grid = split(root);
  grid.forEach(cell => {
    cell.widget = chooseRandomWidget(cell);
  });
  return grid;
};
