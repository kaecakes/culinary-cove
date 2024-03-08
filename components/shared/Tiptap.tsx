"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "@/components/shared/Toolbar";

type TipTapType = {
    onChange: (newInstructions: string) => void,
    instructions: string,
}

const Tiptap = ({ onChange, instructions }: TipTapType) => {
    function handleChange(newContent: string) {
        onChange(newContent);
    };

    const editor = useEditor({
        extensions: [
        StarterKit,
        ],
        editorProps: {
            attributes: {
                class: "flex flex-col px-4 py-3 justify-start items-start w-full outline-none border-none"
            }
        },
        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML());
        }
    });

    return (
        <div className="w-full px-4">
            <Toolbar editor={editor} content={instructions} />
            <EditorContent editor={editor} content={instructions} style={{ whiteSpace: "pre-line" }} className="textarea rounded-br-2xl rounded-bl-2xl h-72 outline-none border-none overflow-y-auto" />
        </div>
    )
}

export default Tiptap;
