import { Component } from "react";

export interface ICellDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IInput {
  id: string;
  name: string;
  defaultValue: any;
}

export interface IOutput {
  defaultValue: any;
}

export interface IInputPosition {
  inputId: string;
  x: number;
  y: number;
}

export interface ISize {
  w: number | "fluid";
  h: number | "fluid";
  inputPositions: Array<IInputPosition>;
}

export interface IBlockConfig {
  id: string;
  output?: IOutput;
  sizes: Array<ISize>;
  inputs: Array<IInput>;
}

export interface IWidget {
  blockConfig: IBlockConfig;
  Component: any;
}

export enum BlockRatio {
  Vertical = "VERTICAL",
  Horizontal = "HORIZONTAL",
  Square = "SQUARE"
}

export enum GlobalsActionTypes {
  ToggleNightMode
}

export interface IGlobalsAction {
  type: GlobalsActionTypes;
}

export interface IGlobalsState {
  isNightMode: boolean;
}
