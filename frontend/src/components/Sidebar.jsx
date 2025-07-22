import { ChartColumnBig, FolderPlus, SquareUser } from 'lucide-react'
import { LiaCommentSolid } from "react-icons/lia";
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaEdit, FaRegEdit } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className='hidden mt-10 fixed md:block border-r-2 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 0 w-[300px] p-10 space-y-2 h-screen z-10'>
      {/* <h1 className='text-xl font-semibold text-gray-700 cursor-pointer hover:bg-gray-800 p-2 text-center rounded-md hover:text-white'>Your Blogs</h1> */}
      {/* <h2 className='text-xl font-semibold cursor-pointer'>Comments</h2> */}
      {/* <h1 className='text-xl font-semibold cursor-pointer hover:bg-gray-800 p-2 text-center rounded-md hover:text-white'>Write a Blog</h1>
      <h1 className='text-xl font-semibold cursor-pointer hover:bg-gray-800 p-2 text-center rounded-md hover:text-white'>Profile</h1> */}

      <div className='text-center pt-10 px-3 space-y-2'>
        <NavLink to='/dashboard/profile' className={({ isActive }) => `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-ful`}>
          <SquareUser />
          <span>Profile</span>
        </NavLink>
        <NavLink to='/dashboard/your-blog' className={({ isActive }) => `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-ful`}>
          <ChartColumnBig />
          <span>Your Blogs</span>
        </NavLink>
        <NavLink to='/dashboard/comments' className={({ isActive }) => `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-ful`}>
          <LiaCommentSolid />
          <span>Comments</span>
        </NavLink>
        <NavLink to='/dashboard/write-blog' className={({ isActive }) => `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-ful`}>
          <FaRegEdit/>
          <span>Create Blog</span>
        </NavLink>
      </div>

    </div>
  )
}

export default Sidebar
