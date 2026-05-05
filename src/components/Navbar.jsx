import React, { useContext } from 'react';
import { Search, Settings, RotateCw, TextAlignJustify } from 'lucide-react';
import { AppContext } from '../context/Appcontext';
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/firebase";
import { auth } from "../firebase/firebase";



const Navbar = () => {
    const { toggleSidebar } = useContext(AppContext);

    return (
        <nav className="flex items-center sticky top-0 z-50 justify-between px-10 py-3 shadow-sm bg-white border-b border-gray-100">


            <div className="flex items-center gap-2">
                <button onClick={toggleSidebar}>
                    <TextAlignJustify />
                </button>

                <img src='images/logo.png' className='h-8' alt="logo" />
                <h1 className='text-xl font-semibold'>Keep</h1>
            </div>


            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="w-5 h-5 text-gray-900" />
                    </span>
                    <input
                        type="text"
                        className="w-full py-2 pl-10 pr-4 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:shadow-xl focus:border-2 focus:border-gray-300 focus:bg-white"
                        placeholder="Search"
                    />
                </div>
            </div>


            <div className="flex items-center space-x-5">
                <RotateCw size={18} />
                <Settings size={18} />

                <button
                    onClick={() => signOut(auth)}
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default Navbar;

