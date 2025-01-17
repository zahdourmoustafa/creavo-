import { useCallback, useState, useMemo } from "react"
import {fabric} from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, Editor, EditorHookProps, FILL_COLOR,STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../type";
import { CIRCLE_OPTIONS,RECTANGLE_OPTIONS ,TRIANGLE_OPTIONS,DIAMOND_OPTIONS} from "../type";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";
import { SendToBack } from "lucide-react";


const buildEditor = ({ canvas, fillColor,strokeColor,setStrokeColor,setFillColor,strokeWidth,setStrokeWidth,selectedObjects, strokeDashArray,setstrokeDashArray}: BuildEditorProps): Editor	 => {
    const getWorkspace = () => {
        return canvas
        .getObjects()
        .find((object) => object.name === "clip");
    }

    const center= (object: fabric.Object) => { 
        const workspace = getWorkspace();
        const center = workspace?.getCenterPoint();

        if (!center) return;

        // @ts-ignore
        canvas._centerObject(object , center );
    }

    const addToCanvas = (object: fabric.Object) => {
        center(object);
        canvas.add(object);
        canvas.setActiveObject(object); 
     }
    return {

        getActiveOpacity: () => {
            const selectedObject = selectedObjects[0];
      
            if (!selectedObject) {
              return 1;
            }
      
            const value = selectedObject.get("opacity") || 1;
      
            return value;
          },

        changeOpacity:(value:number) => {
            canvas.getActiveObjects().forEach((object)=>{
                object.set({opacity: value});
            });
            canvas.renderAll()
        },

        bringForward:() => {
            canvas.getActiveObjects().forEach((object) =>{
                canvas.bringForward(object);
            })

            canvas.renderAll();
        },
        sendBackwards:() => {
            canvas.getActiveObjects().forEach((object) =>{
                canvas.sendBackwards(object);
            })

            canvas.renderAll();
        },


        changeFillColor:(value:string) => {
            setFillColor(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({fill: value});
            });
            canvas.renderAll();
            const workspace = getWorkspace();
            workspace?.sendToBack()
             
        }, 
        changeStrokeColor: (value: string) => {
            setStrokeColor(value);
            canvas.getActiveObjects().forEach((object) => {
              // Text types don't have stroke
              if (isTextType(object.type)) {
                object.set({ fill: value });
                return;
              }
      
              object.set({ stroke: value });
            });
            canvas.freeDrawingBrush.color = value;
            canvas.renderAll();
            const workspace = getWorkspace();
            workspace?.sendToBack()
          },

        changeStrokeWidth:(value:number) => {
            setStrokeWidth(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({strokeWidth: value});
            });
            canvas.renderAll();

        },

        changeStrokeDashArray:(value:number[]) => {
            setstrokeDashArray(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({strokeDashArray: value});
            });
            canvas.renderAll();

        },
        

        addCircle: () => {
            const object = new fabric.Circle({  
                ...CIRCLE_OPTIONS,  
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
                strokeDashArray:strokeDashArray
 
            });
             
            addToCanvas(object);
        },
        addSoftRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 50,
                ry: 50,
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
                strokeDashArray:strokeDashArray


            });
            addToCanvas(object);

        },
        addRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
                strokeDashArray:strokeDashArray


            });
            addToCanvas(object);

        } ,
        addTriangle: () => {
            const object = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
                strokeDashArray:strokeDashArray


            });
            addToCanvas(object);

        } ,

        addInverseTriangle: () => {
            const WIDTH = TRIANGLE_OPTIONS.height;
            const HEIGHT = TRIANGLE_OPTIONS.width;
            const object = new fabric.Polygon(

                [
                    {x: 0, y: 0},
                    {x: WIDTH, y: 0},
                    {x: WIDTH / 2, y: HEIGHT},
                ],
                {
                    ...TRIANGLE_OPTIONS,
                    fill:fillColor,
                    stroke:strokeColor,
                    strokeWidth:strokeWidth,
                    strokeDashArray:strokeDashArray

                }

            );
            addToCanvas(object);

        } ,
        addDiamond: () => {
            const WIDTH = DIAMOND_OPTIONS.height;
            const HEIGHT = DIAMOND_OPTIONS.width ;
            const object = new fabric.Polygon(

                [
                    {x: WIDTH / 2, y: 0},
                    {x: WIDTH, y: WIDTH / 2},
                    {x: WIDTH / 2, y: WIDTH },
                    {x: 0, y: HEIGHT/2},
                ],
                {
                    ...DIAMOND_OPTIONS,
                    fill:fillColor,
                    stroke:strokeColor,
                    strokeWidth:strokeWidth,
                    strokeDashArray:strokeDashArray
                }

            );
            addToCanvas(object);

        } ,
        canvas,
        getActiveFillColor: () => {
            const selectedObject = selectedObjects[0];
      
            if (!selectedObject) {
              return fillColor;
            }
      
            const value = selectedObject.get("fill") || fillColor;
      
            // Currently, gradients & patterns are not supported
            return value as string;
          },
          getActiveStrokeColor: () => {
            const selectedObject = selectedObjects[0];
      
            if (!selectedObject) {
              return strokeColor;
            }
      
            const value = selectedObject.get("stroke") || strokeColor;
      
            return value;
          },
          getActiveStrokeWidth: () => {
            const selectedObject = selectedObjects[0];
      
            if (!selectedObject) {
              return strokeWidth;
            }
      
            const value = selectedObject.get("strokeWidth") || strokeWidth;
      
            return value;
          },

          getActiveStrokeDashArray: () => {
            const selectedObject = selectedObjects[0];
      
            if (!selectedObject) {
              return strokeDashArray;
            }
      
            const value = selectedObject.get("strokeDashArray") || strokeDashArray;
      
            return value;
          },

          selectedObjects






       
    }
}
export const useEditor = ({clearSelectionCallback}
    :EditorHookProps) => { 

    const [canvas ,setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setSelectedObjects] =useState<fabric.Object[]>([]);

    const[fillColor, setFillColor] = useState(FILL_COLOR);
    const[strokeColor, setStrokeColor] = useState(STROKE_COLOR);
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
    const [strokeDashArray, setstrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);


    useAutoResize({canvas, container});

    useCanvasEvents({canvas, setSelectedObjects,clearSelectionCallback});

    const editor  = useMemo(()=> { 
        if(canvas){
            return buildEditor({
                canvas,
                fillColor,
                strokeColor,
                strokeDashArray,
                setstrokeDashArray,
                strokeWidth,
                setFillColor,
                setStrokeColor,
                setStrokeWidth,
                selectedObjects
            });
        }
        return undefined;

    },[canvas,                
        fillColor,
        strokeDashArray,
        setstrokeDashArray,
        strokeColor,
        strokeWidth,]);

    const init = useCallback(({
        initialCanvas, 
        initialContainer,
    }:{
        initialCanvas:fabric.Canvas,
        initialContainer:HTMLDivElement
    }) => {
        const initWorkspace= new fabric.Rect({
            width: 900,
            height:1200,
            name: "clip",
            fill: "white",
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.8)",
                blur: 5,

            }),
        })

        initialCanvas.setWidth(initialContainer.clientWidth);
        initialCanvas.setHeight(initialContainer.clientHeight);

        initialCanvas.add(initWorkspace);
        initialCanvas.centerObject(initWorkspace);
        initialCanvas.clipPath = initWorkspace; 

        setCanvas(initialCanvas);
        setContainer(initialContainer);

        


    },
    []);
 
    return {init, editor}
}