import { fabric } from "fabric";
import * as material from "material-colors"

export const selectionDependentTools = [
    "fill",
    "font",
    "filter",
    "opacity",
    "remove-bg",
    "stroke-color",
    "stroke-width",
  ];

export const colors = [
    material.red["500"],
    material.pink["500"],
    material.purple["500"],
    material.deepPurple["500"],
    material.indigo["500"],
    material.blue["500"],
    material.lightBlue["500"],
    material.cyan["500"],
    material.teal["500"],
    material.green["500"],
    material.lightGreen["500"],
    material.lime["500"],
    material.yellow["500"],
    material.amber["500"],
    material.orange["500"],
    material.deepOrange["500"],
    material.brown["500"],
    material.blueGrey["500"],
    "transparent",
  ];
export type ActiveTool = "select" | "shapes" | "text" | "images" | "draw" | "fill" | "stroke-color" | "stroke-width" | "font" | "opacity" | "filters" | "settings" | "ai" | "remove-bg" | "templates" ;

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY=[]
export const CIRCLE_OPTIONS = {
    radius: 225,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const RECTANGLE_OPTIONS = {
    width: 400,
    height: 400,
    angle: 0,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const TRIANGLE_OPTIONS = {
    width: 400,
    height: 400,
    angle: 0,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const DIAMOND_OPTIONS = {
    width: 400,
    height: 400,
    angle: 0,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH, 
}

export interface EditorHookProps {
    defaultState?: string;
    defaultWidth?: number;
    defaultHeight?: number;
    clearSelectionCallback?: () => void;
    saveCallback?: (values: {
      json: string;
      height: number;
      width: number;
    }) => void;
  };
  

export type BuildEditorProps ={
    canvas: fabric.Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    selectedObjects:fabric.Object[]
    setFillColor: (value: string) => void;
    setStrokeColor: (value: string) => void;
    setStrokeWidth: (value: number) => void;
    strokeDashArray: number[],
    setstrokeDashArray:(value:number[]) => void;

}


export interface Editor {
  getActiveOpacity:() => number;
  changeOpacity:(value:number) => void,

  bringForward:() => void,
  sendBackwards:() => void,
    changeStrokeColor: (value: string) => void;
    changeStrokeWidth: (value: number) => void;
    changeFillColor: (value: string) => void;
    changeStrokeDashArray: (value: number[]) => void;
    addCircle: () => void;
    addSoftRectangle: () => void;
    addRectangle: () => void;
    addTriangle: () => void;
    addInverseTriangle: () => void;
    addDiamond:() => void;
    canvas: fabric.Canvas;
    getActiveFillColor:() => string;
    getActiveStrokeColor:() => string;
    getActiveStrokeWidth:()=> number;
    getActiveStrokeDashArray:()=> number[];

    selectedObjects:fabric.Object[]


}
