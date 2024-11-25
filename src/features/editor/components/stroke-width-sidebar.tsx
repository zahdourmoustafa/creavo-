import { cn } from "@/lib/utils";
import { ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../type";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ColorPicker } from "./color-picker";
import {  STROKE_COLOR} from "../type";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";


interface StrokeWidthSidebarProps{
    editor: Editor | undefined; //todo change type
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;

}

export const StrokeWidthSidebar = ({editor,activeTool, onChangeActiveTool}: StrokeWidthSidebarProps) => {
    const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
    const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
    const onClose = () => {
        onChangeActiveTool("select");
    }

    const onChangeStrokeWidth =(value :number) => {
        editor?.changeStrokeWidth(value);
    }
    const onChangeStrokeType = (value:number[]) => {
        editor?.changeStrokeDashArray(value)
    }
    return(
        <aside className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col", activeTool==="stroke-width" ?"visible": "hidden"
        )}>
            <ToolSidebarHeader 
            title="Stroke options" 
            description="Modify the strok of your element" />

            <ScrollArea>
                <div className=" p-4 space-y-4 border-b">
                    <Label className="text-sm">
                        Stroke Width
                    </Label>
                    <Slider
                      value={[widthValue]}
                      onValueChange={(values) => onChangeStrokeWidth(values[0])}
                    />
                </div>

                <div className=" p-4 space-y-4 border-b">
                    <Label className="text-sm">
                        Stroke Type
                    </Label>
                    <Button
                    onClick={() => onChangeStrokeType([])}
                    variant="secondary"
                    size="lg"
                    className={cn("w-full h-16 justify-start text-left", 
                        JSON.stringify(typeValue) === `[]` && "border border-blue-500"
                    )}
                    style={{
                        padding:"8px 16px"
                    }}
                    >
                        <div className="w-full border-black rounded-full border-4 "/>
                    </Button>
                   
                    <Button
                     onClick={() => onChangeStrokeType([5,5])}

                    variant="secondary"
                    size="lg"
                    className={cn("w-full h-16 justify-start text-left", 
                        JSON.stringify(typeValue) === `[5,5]` && "border border-blue-500"
                    )}
                    style={{
                        padding:"8px 16px"
                    }}
                    >
                        <div className="w-full border-black rounded-full border-4 border-dashed "/>
                    </Button>
                </div>
            </ScrollArea>

            <ToolSidebarClose onClick={onClose}/>


        </aside>
    )

}