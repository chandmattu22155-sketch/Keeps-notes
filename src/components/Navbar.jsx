import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import { AppContext } from '../context/Appcontext';
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/firebase";
import { auth } from "../firebase/firebase";



const Navbar = () => {
    const { toggleSidebar, searchTerm, setSearchTerm } = useContext(AppContext);



    return (
        <nav className="flex items-center sticky top-0 z-100 justify-between px-10 py-3 shadow-sm bg-white border-b border-gray-100">


            <div className="flex items-center gap-2">


                <img src='images/logo.png' className='h-10' alt="logo" />
                <h1 className='text-xl font-semibold uppercase'>Keep Notes</h1>
            </div>


            <div className="flex-1 max-w-2xl mx-8 ">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="w-5 h-5 text-gray-900" />
                    </span>

                    <input
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search Notes....'
                        type="text"
                        className="w-full py-2 pl-10 pr-4 text-gray-900 bg-gray-200 rounded-md transition-all duration-200 
                focus:outline-none  focus:ring-2 focus:ring-yellow-400"
                    />

                </div>

            </div>


            <div className="flex items-center space-x-5">


                <button
                    onClick={() => signOut(auth)}
                    className="bg-sky-400 text-white px-2 py-1 rounded"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default Navbar;

