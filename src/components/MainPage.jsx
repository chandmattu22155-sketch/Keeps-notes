import { Image, Palette, Bold,
  Italic,
  Underline as UnderlineIcon,
  Baseline,
  Trash2
} from 'lucide-react';

import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/Appcontext';
import Notes from "../components/Notes";

function MainPage() {

  const { fileInputRef, handleClick, handleFileChange, notes, updateNote, deleteNote, saveNote } =
    useContext(AppContext);

  const [open, setOpen] = useState(false);

  const editorRef = useRef(null);
  const formatMenuRef = useRef(null);
  const contentRef = useRef(null);

  const colors = ["ffffff", "bde0fe", "ffafcc", "ffb703", "c77dff", "17c3b2", "1b98e0","faedcd","83c5be","2196f3","ef233c","00bbf9"];
  const [bgColor, setBgColor] = useState("ffffff");
  const [title, setTitle] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOutsideEditor =
        editorRef.current && !editorRef.current.contains(event.target);

      if (clickedOutsideEditor) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const handleToolbarClick = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="w-full ">

      {!open && (
        <div className="px-4 sm:px-10 md:px-20 py-6 flex justify-center">
          <div
            className="flex items-center shadow-xl border border-gray-200 w-full sm:w-[500px] md:w-[600px] lg:w-[640px] rounded-lg px-4 py-2"
            style={{ backgroundColor: "#ffffff" }}
          >
            <input
              type="text"
              placeholder="Take a note..."
              className="flex-1 h-8 text-lg bg-transparent outline-none text-black placeholder-gray-700"
              onFocus={() => setOpen(true)}
            />
          </div>
        </div>
      )}

      {open && (
        <div
          className="px-4 sm:px-10 md:px-20 py-6 flex justify-center"
          ref={editorRef}
        >
          <div
            className="shadow-xl border border-gray-200 w-full max-w-[640px] min-h-40 rounded-lg px-4 py-3 flex flex-col"
            style={{ backgroundColor: `#${bgColor}` }}
          >

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg sm:text-xl font-semibold  ml-2 bg-transparent outline-none mb-2 text-black"
            />

            <div
              ref={contentRef}
              contentEditable
              className="min-h-20 text-gray-700 border border-gray-300 rounded p-2 outline-none"
              data-placeholder="Take a note..."
            />
            
         
            <div
              ref={formatMenuRef}
              className="bg-white shadow-2xl  w-90 border border-gray-200 rounded-lg flex flex-wrap gap-4 p-2 mt-4 z-50"
            >
              <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleToolbarClick('bold')}>
                <Bold size={16} />
              </button>

              <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleToolbarClick('italic')}>
                <Italic size={16} />
              </button>

              <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleToolbarClick('underline')}>
                <UnderlineIcon size={16} />
              </button>

              <button onMouseDown={(e) => e.preventDefault()} onClick={() => handleToolbarClick('removeFormat')}>
                <Baseline size={16} />
              </button>

              <select
                onChange={(e) => applyFormat('fontName', e.target.value)}
                className="p-1 border border-gray-300 appearance-none outline-none  rounded text-sm"
              >
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Courier New</option>
                <option>Georgia</option>
                <option>Verdana</option>
              </select>

              <select
                onChange={(e) => applyFormat('fontSize', e.target.value)}
                className="p-1 border rounded text-sm appearance-none outline-none  border-gray-300 "
              >
                <option value="2">Small</option>
                <option value="4">Normal</option>
                <option value="5">Large</option>
              </select>
            </div>

           
            <div className="bg-white shadow-xl border w-90 border-gray-300 rounded-2xl flex flex-wrap gap-2 p-2 mt-3 z-50">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBgColor(color)}
                  className="w-5 h-5 rounded "
                  style={{ backgroundColor: `#${color}` }}
                />
              ))}
            </div>




            <div className="flex items-center gap-3 mt-6">

              <button
                onClick={() => {
                  const content = contentRef.current.innerHTML;

                  saveNote({
                    title,
                    content,
                    bgColor
                  });

                  contentRef.current.innerHTML = "";
                  setTitle("");
                  setOpen(false);
                  setBgColor("ffffff");
                }}
                className="px-2 py-1 rounded-md bg-blue-400 text-white hover:bg-blue-500 transition duration-300"
              >
                Save
              </button>

              <button
                onClick={() => setOpen(false)}
                className="ml-auto px-3 py-1 rounded-md hover:bg-white"
              >
                <Trash2 size={20} />
              </button>

            </div>

          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <Notes
        notes={notes}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}

export default MainPage;
