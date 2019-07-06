import {
  ISize,
  IBlockConfig,
  ICellDimensions,
  BlockRatio
} from "../interfaces";

export const getSizes = (blockConfig: IBlockConfig): Array<ISize> => {
  return blockConfig.sizes;
};

export const matchesSize = (
  cellDimensions: ICellDimensions,
  blockSize: ISize
): boolean => {
  return (
    (blockSize.w === "fluid" || blockSize.w === cellDimensions.width) &&
    (blockSize.h === "fluid" || blockSize.h === cellDimensions.height)
  );
};

export const getBlockRatio = (dimensions: ICellDimensions): BlockRatio => {
  if (dimensions.width > dimensions.height) {
    return BlockRatio.Horizontal;
  } else if (dimensions.width < dimensions.height) {
    return BlockRatio.Vertical;
  } else {
    return BlockRatio.Square;
  }
};
