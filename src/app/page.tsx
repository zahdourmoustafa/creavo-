import { Editor } from "@/features/editor/components/editor";
import Image from "next/image";
import EditorProjectPage from "./editor/[projectId]/page";

export default function Home() {
  return (
    <div >
      <EditorProjectPage />
    </div>
  );
}
