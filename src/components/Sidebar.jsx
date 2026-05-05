import { useContext, useState } from 'react'
import { AppContext } from '../context/Appcontext'
import { Lightbulb, Bell, Pencil, Archive, Trash } from 'lucide-react';


const Sidebar = () => {

  return (
    <div className='bg-white h-screen w-1/4 shadow-lg sticky top-0 z-50'>
      <div className='ml-2 p-4 text-sm space-y-1 font-semibold'>

        <div className='flex gap-4 py-3 px-2 bg-amber-100 rounded-2xl'>
          <Lightbulb size={20}/>
          <h1>Notes</h1>
        </div>

        <div className='flex gap-4 py-3 px-2 hover:bg-gray-200 rounded-2xl'>
          <Bell size={20}/>
          <h1>Reminders</h1>
        </div>

        <div className='flex gap-4 py-3 px-2 hover:bg-gray-200 rounded-2xl'>
          <Pencil size={20}/>
          <h1>Edit Label</h1>
        </div>

        <div className='flex gap-4 py-3 px-2 hover:bg-gray-200 rounded-2xl'>
          <Archive size={20}/>
          <h1>Archive</h1>
        </div>

        <div className='flex gap-4 py-3 px-2 hover:bg-gray-200 rounded-2xl'>
          <Trash size={20}/>
          <h1>Trash</h1>
        </div>

      </div>
    </div>
  )
}

export default Sidebar;