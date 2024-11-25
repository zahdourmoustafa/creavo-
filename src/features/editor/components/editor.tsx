"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/use-editor";
import { fabric } from "fabric";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";
import { ActiveTool, selectionDependentTools } from "../type";
import { ShapeSidebar } from "./shape-sidebar";
import { FillColorSidebar } from "./fill-color-sidebar";
import { StrokeColorSidebar } from "./stroke-color-sidebar";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  
  const onChangeActiveTool = useCallback((tool:ActiveTool)=> {
    if(tool===activeTool) {
      return setActiveTool("select");
    }

    if (tool==="draw") {
      //TODO: Implement draw tool
    }

    if (activeTool==="draw") {
      //TODO: Implement draw tool
    }

    setActiveTool(tool);
    
  },[activeTool]);

  const { init ,editor} = useEditor({
    clearSelectionCallback:onClearSelection,
  }); 

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });
    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
    return () => { 
      canvas.dispose();
    }
  }, [init]);


  return (
    <div className="h-full flex flex-col">
      <Navbar 
      activeTool={activeTool}
      onchangeActiveTool={onChangeActiveTool}
      />

      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
       
        <Sidebar  
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}/>

        <ShapeSidebar 
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
        />

        <FillColorSidebar
                editor={editor}
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
          key={JSON.stringify(editor?.canvas.getActiveObject()  )}/>
          
          <div className="flex-1 h-[calc(100%-124px)] bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  );
};
