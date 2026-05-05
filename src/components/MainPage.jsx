import { Image, Palette, Bold, Italic, Underline as UnderlineIcon, Baseline,Trash2 } from 'lucide-react';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Notes from "../components/Notes";

function MainPage() {

const { fileInputRef, handleClick, handleFileChange, notes, updateNote, deleteNote, saveNote } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [showFormatMenu, setShowFormatMenu] = useState(false);
    const [showColorMenu, setShowColorMenu] = useState(false);

    const editorRef = useRef(null);
    const formatMenuRef = useRef(null);
    const contentRef = useRef(null);    

    const colors = ["ffffff", "a2d2ff", "83c5be", "ff99c8", "e4c1f9", "f4b942"];
    const [bgColor, setBgColor] = useState("ffffff");
    const [title, setTitle] = useState("");

    useEffect(() => {
        function handleClickOutside(event) {
            const clickedOutsideEditor =
                editorRef.current && !editorRef.current.contains(event.target);

            const clickedOutsideMenu =
                formatMenuRef.current && !formatMenuRef.current.contains(event.target);


            const clickedOutsideColorMenu =
                !event.target.closest(".color-menu");

                
            if (clickedOutsideEditor && clickedOutsideMenu && clickedOutsideColorMenu) {
                setOpen(false);
                setShowFormatMenu(false);
                setShowColorMenu(false);
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
                            className="flex-1 bg-transparent outline-none text-black placeholder-gray-500"
                            onFocus={() => 
                                setOpen(true)

                            }
                            
                        />

                        <button
                            onClick={handleClick}
                            className="hover:bg-gray-200 p-2 rounded-full"
                        >
                            <Image size={20} />
                        </button>
                    </div>
                </div>
            )}

            {open && (
                <div
                    className="px-4 sm:px-10 md:px-20 py-6 flex sticky  justify-center"
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
                            className="text-lg sm:text-xl font-semibold bg-transparent outline-none mb-2 text-black"
                        />

                        <div
                            ref={contentRef}
                            contentEditable
                            className="min-h-20 text-gray-700 outline-none"
                            data-placeholder="Take a note..."
                        />

                        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-6 relative">
                            <button
                                onClick={() => setShowFormatMenu(!showFormatMenu)}
                               
                            >
                                <span className="font-bold">A</span>
                            </button>

                            {showFormatMenu && (
                                <div
                                    ref={formatMenuRef}
                                    className="absolute bottom-12 left-0 bg-white shadow-xl border rounded-lg flex flex-wrap gap-2 p-2 z-50"
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
                                        className="p-1 border rounded text-sm"
                                    >
                                        <option>Arial</option>
                                        <option>Times New Roman</option>
                                        <option>Courier New</option>
                                        <option>Georgia</option>
                                        <option>Verdana</option>
                                    </select>

                                    <select
                                        onChange={(e) => applyFormat('fontSize', e.target.value)}
                                        className="p-1 border rounded text-sm"
                                    >
                                        <option value="2">Small</option>
                                        <option value="4">Normal</option>
                                        <option value="5">Large</option>
                                    </select>
                                </div>
                            )}

                            <div className="relative color-menu">
                                <button
                                    onClick={() => setShowColorMenu(!showColorMenu)}
                                    className="p-2 rounded-full hover:bg-gray-200"
                                >
                                    <Palette size={18} />
                                </button>

                                {showColorMenu && (
                                    <div className="absolute left-0 bg-white shadow-xl border border-gray-300 rounded-lg flex flex-wrap gap-2 p-2 z-50">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => {
                                                    setBgColor(color);
                                                    setShowColorMenu(false);
                                                    
                                                }}
                                                className="w-5 h-5 rounded-full border"
                                                style={{ backgroundColor: `#${color}` }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

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
                                className="p-2 rounded-full hover:bg-gray-200"
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


