import { ChevronsLeft } from "lucide-react";

interface ToolSidebarCloseProps {
    onClick: () => void;
}

export const ToolSidebarClose = ({onClick}: ToolSidebarCloseProps) => {
    return(
        <button
        onClick={onClick}
        className="absolute -right-[1.80rem] h-[70px] bg-white top-1/2 tranform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r bordr-y group">
            <ChevronsLeft className=" size-4 text-black group-hover:opacity-75 transition"/>
        </button>
    )

}