import { useState, useRef, useContext } from "react";
import { Bold, Italic, Underline as UnderlineIcon, Baseline, Palette } from "lucide-react";
import { AppContext } from "../context/Appcontext"; 

function Notes({ notes, updateNote, deleteNote }) {
  const { saveNote } = useContext(AppContext); 

  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [bgColor, setBgColor] = useState("ffffff");
  const contentRef = useRef(null);

 

  const colors = ["ffffff","bde0fe","ffafcc","ffb703","c77dff","17c3b2","1b98e0"];

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
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

  const handleAddNote = async () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = newContent;
    if (!tempDiv.textContent.trim() && !newTitle.trim()) return;

    await saveNote({
      title: newTitle,
      content: newContent,
      bgColor: newBgColor,
    });
   
    setNewTitle("");
    setNewContent("");
    setNewBgColor("ffffff");
    setShowAddForm(false);
  };

  return (
    <div className="p-4 sm:p-10">
     
     

     
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {notes.map((note) => (
          <div key={note.id}>
            <div
              className="p-4 rounded-2xl shadow-2xl w-full min-h-30 max-h-50 overflow-hidden cursor-pointer"
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
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{note.title}</h3>
              )}
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </div>

           
            {openId === note.id && (
              <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                <div
                  className="bg-white w-[90%] max-w-lg rounded-2xl p-5 shadow-2xl flex flex-col gap-3"
                  style={{ backgroundColor: `#${bgColor}` }}
                >
                  <h1 className="font-bold text-2xl">Title</h1>
                  <input
                    className="w-full p-2 border border-gray-800 rounded-xl outline-none"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Enter title..."
                  />

                  <div className="flex gap-3 flex-wrap items-center">
                    <button onClick={() => handleFormat("bold")}><Bold size={16} /></button>
                    <button onClick={() => handleFormat("italic")}><Italic size={16} /></button>
                    <button onClick={() => handleFormat("underline")}><UnderlineIcon size={16} /></button>
                    <button onClick={() => handleFormat("removeFormat")}><Baseline size={16} /></button>
                    <select onChange={(e) => handleFormat("fontName", e.target.value)} className="border p-1 text-sm">
                      <option>Arial</option><option>Times New Roman</option><option>Courier New</option><option>Georgia</option>
                    </select>
                    <select onChange={(e) => handleFormat("fontSize", e.target.value)} className="border p-1 text-sm">
                      <option value="2">Small</option><option value="4">Normal</option><option value="5">Large</option>
                    </select>
                    <div className="flex gap-1 items-center">
                      <Palette size={16} />
                      {colors.map((c) => (
                        <button key={c} className="w-4 h-4 rounded-full" style={{ backgroundColor: `#${c}` }} onClick={() => setBgColor(c)} />
                      ))}
                    </div>
                  </div>

                  <div
                    ref={contentRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="min-h-[150px] border p-2 rounded outline-none bg-white"
                    dangerouslySetInnerHTML={{ __html: editedContent }}
                  />

                  <div className="flex justify-end gap-3 mt-3">
                    <button onClick={() => setOpenId(null)} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
                    <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                    <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    
    </div>
  );
}

export default Notes;