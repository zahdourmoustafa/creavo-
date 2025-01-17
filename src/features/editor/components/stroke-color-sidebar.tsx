import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../type";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ColorPicker } from "./color-picker";
import {  STROKE_COLOR} from "../type";


interface StrokeColorSidebarProps{
    editor: Editor | undefined; //todo change type
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;

}

export const StrokeColorSidebar = ({editor,activeTool, onChangeActiveTool}: StrokeColorSidebarProps) => {
    const value = editor?.getActiveStrokeColor() || STROKE_COLOR;
    const onClose = () => {
        onChangeActiveTool("select");
    }

    const onChange =(value :string) => {
        editor?.changeStrokeColor(value);

    }
    return(
        <aside className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col", activeTool==="stroke-color" ?"visible": "hidden"
        )}>
            <ToolSidebarHeader 
            title="Stroke color" 
            description="Add stroke color to your element" />

            <ScrollArea>
                <div className=" p-4 space-y-6">
                    <ColorPicker
                    value={value}
                    onChange={onChange }
                      />
                   
                </div>
            </ScrollArea>

            <ToolSidebarClose onClick={onClose}/>


        </aside>
    )

}