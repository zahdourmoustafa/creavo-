<DropdownMenuContent align="start" className="min-w-60 z-50"></DropdownMenuContent>

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Logo } from "./logo";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, MousePointerClick, Redo2, Undo2 } from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";
import { BsCloudCheck } from "react-icons/bs";
import { ActiveTool } from "../type";
import { cn } from "@/lib/utils";


interface NavbarProps {
  activeTool: ActiveTool;
  onchangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({activeTool,onchangeActiveTool}:NavbarProps) => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="font-bold ">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60 z-50 bg-white border border-gray-300 rounded-md" >
            <DropdownMenuItem
              onClick={() => {}} //later
              className="flex items-center gap-x-2"
            >
              <CiFileOn className="size-8" />
              <div>
                <p className="font-bold">Open</p>
                <p className="text-xs text-muted-forground">Open a JSON file</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onchangeActiveTool("select")} //later
            className={cn(activeTool === "select" && "bg-gray-200")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}} //later
            className=""
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}} //later
            className=""
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Saved</div>
        </div>
        <div className="ml-auto flex items-center gap-x-4"> 
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost" className="text-bold">
                        Export
                        <Download className="size-4 ml-4"/>
                        </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-60 z-50 bg-white border border-gray-300 rounded-md">
                    <DropdownMenuItem className="flex items-center gap-x-2"
                    onClick={() =>{}}>
                        <CiFileOn className="size-8 "/>
                        <div>
                            <p className="font-bold">JSON</p>
                            <p className="text-xs text-muted-foreground">Save for later editing</p>
                            </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-x-2"
                    onClick={() =>{}}>
                        <CiFileOn className="size-8 "/>
                        <div>
                            <p className="font-bold">JPG</p>
                            <p className="text-xs text-muted-foreground">Best for printing</p>
                            </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-x-2"
                    onClick={() =>{}}>
                        <CiFileOn className="size-8 "/>
                        <div>
                            <p className="font-bold">PNG</p>
                            <p className="text-xs text-muted-foreground">Best for sharing on the web</p>
                            </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-x-2"
                    onClick={() =>{}}>
                        <CiFileOn className="size-8 "/>
                        <div>
                            <p className="font-bold">SVG</p>
                            <p className="text-xs text-muted-foreground">Best for editing in vector software </p>
                            </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>  </div>
      </div>
    </nav>
  );
};
