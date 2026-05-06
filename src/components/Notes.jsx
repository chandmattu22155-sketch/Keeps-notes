import { useState, useRef, useContext } from "react";
import { Bold, Italic, Underline as UnderlineIcon, Baseline } from "lucide-react";
import { AppContext } from "../context/Appcontext";
import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react";



function DraggableNote({ note, children }) {
  const { ref } = useDraggable({
    id: note.id,
  });

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}



function DroppableArea({ id, children }) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div ref={ref} >
      {children}
    </div>
  );
}



function Notes() {

  const { notes, setNotes, updateNote, deleteNote , searchTerm} = useContext(AppContext);


  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [bgColor, setBgColor] = useState("ffffff");

  const contentRef = useRef(null);

  const colors = ["ffffff", "bde0fe", "ffafcc", "ffb703", "c77dff", "17c3b2","17c3b2", "1b98e0","faedcd","83c5be","2196f3","ef233c","00bbf9"];

const filteredNotes = notes.filter((note) =>
  note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  note.content?.toLowerCase().includes(searchTerm.toLowerCase())
);
 if (notes.length === 0) {
  return (
    <div className="p-10 text-center font-bold text-gray-700 text-2xl">
      No notes yet
    </div>
  );
}



 if (filteredNotes.length === 0) {
   return(
    <div className="p-10 text-center font-bold   text-gray-700 text-2xl">
      No Matching Result
    </div>
    )
    
 }  
  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    contentRef.current?.focus();
  };


  const handleSave = () => {
    const content = contentRef.current.innerHTML;

    updateNote(currentId, {
      title: editedTitle,
      content,
      bgColor,
    });

    setOpenId(null);
  };


  const handleDelete = () => {
    deleteNote(currentId);
    setOpenId(null);
  };


  const handleDragEnd = (event) => {
    if (event.canceled) return;

    const { source, target } = event.operation;

    if (!target) return;

    const oldIndex = notes.findIndex((n) => n.id === source.id);
    const newIndex = notes.findIndex((n) => n.id === target.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = [...notes];
    const [moved] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, moved);

    setNotes(newOrder);
  };

  return (
    <div className="p-4 sm:p-10">

      <DragDropProvider onDragEnd={handleDragEnd}>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredNotes.map((note) => (

            <DroppableArea key={note.id} id={note.id}>

              <DraggableNote note={note}>


                <div
                  className="p-4 rounded-2xl shadow-2xl min-h-30 max-h-50 overflow-hidden cursor-pointer"
                  style={{ backgroundColor: `#${note.bgColor}` }}
                  onClick={() => {
                    setEditedTitle(note.title || "");
                    setEditedContent(note.content);
                    setCurrentId(note.id);
                    setBgColor(note.bgColor || "ffffff");
                    setOpenId(note.id);
                  }}
                >



                  {note.title && (
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">
                      {note.title}
                    </h3>
                  )}

                  <div dangerouslySetInnerHTML={{ __html: note.content }} />
                </div>

              </DraggableNote>

            </DroppableArea>
          ))}

        </div>

      </DragDropProvider>


      {openId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">

          <div
            className="bg-white w-[90%] max-w-lg rounded-2xl p-5 shadow-2xl flex flex-col gap-3"
            style={{ backgroundColor: `#${bgColor}` }}
          >
              <h1 className="text-2xl font-bold">
                Title
              </h1>
            <input
              className="w-full p-2 border border-gray-500 outline-none  rounded"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />

            <div className="flex gap-2">
              <button onClick={() => handleFormat("bold")}><Bold size={16} /></button>
              <button onClick={() => handleFormat("italic")}><Italic size={16} /></button>
              <button onClick={() => handleFormat("underline")}><UnderlineIcon size={16} /></button>
              <button onClick={() => handleFormat("removeFormat")}><Baseline size={16} /></button>
            </div>


           

            <div
              ref={contentRef}
              contentEditable
              className="min-h-[150px] border border-gray-300 p-2  outline-none rounded bg-white"
              dangerouslySetInnerHTML={{ __html: editedContent }}
            />

            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  className="w-5 h-5 border border-gray-500  rounded"
                  style={{ backgroundColor: `#${c}` }}
                  onClick={() => setBgColor(c)}
                />
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => setOpenId(null)}
                className="px-4  rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </button>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default Notes;





