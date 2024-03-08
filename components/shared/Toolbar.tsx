import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react";
import { Editor } from "@tiptap/react";

type ToolbarType = {
  editor: Editor | null,
  content: string,
}

const Toolbar = ({ editor, content }: ToolbarType) => {
  return (
    <div className="px-4 py-3 rounded-tl-2xl rounded-tr-2xl flex justify-between items-start gap-5 w-full flex-wrap border">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        {/* UNDO */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().undo().run();
          }}
          className={
            editor?.isActive("undo")
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        {/* REDO */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().redo().run();
          }}
          className={
            editor?.isActive("redo")
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
        {/* BOLD */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleBold().run();
          }}
          className={
            editor?.isActive("bold")
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        {/* ITALIC */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleItalic().run();
          }}
          className={
            editor?.isActive("italic")
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        {/* STRIKETHROUGH */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleStrike().run();
          }}
          className={
            editor?.isActive("strike")
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        {/* UNORDERED LIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleBulletList().run();
          }}
          className={
            editor?.isActive("bulletList")
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <List className="w-5 h-5" />
        </button>
        {/* ORDERED LIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor?.isActive("orderedList")
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        {/* HEADING1 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleHeading({level: 1}).run();
          }}
          className={
            editor?.isActive("heading", { level: 1 })
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <Heading1 className="w-5 h-5" />
        </button>
        {/* HEADING2 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleHeading({level: 2}).run();
          }}
          className={
            editor?.isActive("heading", { level: 2 })
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        {/* HEADING3 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleHeading({level: 3}).run();
          }}
          className={
            editor?.isActive("heading", { level: 3 })
              ? "bg-primary-500 text-white p-2 rounded-lg"
              : "text-primary-500 p-2"
          }
        >
          <Heading3 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Toolbar;