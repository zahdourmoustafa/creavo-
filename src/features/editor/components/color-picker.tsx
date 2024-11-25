import {ChromePicker , CirclePicker} from "react-color" 
import {rgbaObjectToString} from "@/features/editor/utils"
import {colors} from "@/features/editor/type"
interface ColorPickerProps{
    value:string;
    onChange :(value:string)=>void;

};

export const ColorPicker=({
    value = "rgba(0,0,0,1)",

    onChange,

}:ColorPickerProps)=>{
    return(
        <div className="w-full space-y-4">
            <ChromePicker
            color={value}
            onChange={(color)=>{
                const formattedValue = rgbaObjectToString(color.rgb);
                onChange(formattedValue)
            }}
            className="border rounded-lg"
            />
            <CirclePicker
            color={value}
            colors={colors}
            onChangeComplete={(color)=>{
                const formattedValue = rgbaObjectToString(color.rgb);
                onChange(formattedValue)
            }}


            />
        </div>
    )
}