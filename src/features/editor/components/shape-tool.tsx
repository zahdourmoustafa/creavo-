import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";


interface ShapeToolProps { 
    onClick: () => void;
    icon:LucideIcon | IconType;
    iconClasseName?: string;
}

export const ShapeTool = ({onClick, icon:Icon, iconClasseName}: ShapeToolProps) => {
    return(
        <button  onClick={onClick} className="aspect-square border rounded-md p-5">
            <Icon className={cn("h-full w-full",iconClasseName)} /> 
        </button>
    )

}