"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "@/components/shared/Toolbar";
import { useEffect } from "react";

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
        content: instructions,
        editorProps: {
            attributes: {
                class: "flex flex-col px-4 py-3 justify-start items-start w-full outline-none border-none"
            }
        },
        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML());
        }
    });

    useEffect(() => {
        editor?.commands.setContent(instructions)
    }, [editor]);

    return (
        <div className="w-full px-4">
            <Toolbar editor={editor} content={instructions} />
            <EditorContent editor={editor} style={{ whiteSpace: "pre-line" }} className="textarea rounded-br-2xl rounded-bl-2xl h-72 outline-none border-none overflow-y-auto" />
        </div>
    )
}

export default Tiptap;
