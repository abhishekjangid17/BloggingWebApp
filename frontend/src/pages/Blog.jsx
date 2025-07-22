import BlogCard from '@/components/BlogCard'
import React, { useEffect } from 'react'
import LMS from "../assets/LMS.png"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'
// import BlogCardList from '@/components/BlogCardList'

export const blogJson = [
    {
        "id": 1,
        "title": "The Ultimate Guide to Digital Marketing in 2025",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "Digital marketing is constantly evolving. In 2025, businesses must focus on AI-driven strategies, voice search optimization, and hyper-personalization. This guide covers the latest trends and strategies for success.",
        "tags": ["digital marketing", "SEO", "social media", "PPC"],
        "category": "Marketing",
        "image": LMS
    },
    {
        "id": 2,
        "title": "Building a Full-Stack LMS with MERN Stack",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "A step-by-step guide to building a Learning Management System (LMS) using React, Tailwind CSS, Node.js, Express.js, and MongoDB. Learn how to create courses, manage users, and process payments.",
        "tags": ["MERN stack", "LMS", "React", "Node.js"],
        "category": "Web Development",
        "image": LMS
    },
    {
        "id": 3,
        "title": "Top 10 WordPress Plugins for 2025",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "WordPress remains the most popular CMS. This article covers the top 10 must-have plugins for security, SEO, performance, and customization in 2025.",
        "tags": ["WordPress", "plugins", "SEO", "website optimization"],
        "category": "WordPress",
        "image": LMS
    },
    {
        "id": 4,
        "title": "How to Use APIs in Web Development",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "APIs play a crucial role in modern web development. Learn how to integrate third-party APIs, create RESTful APIs with Node.js, and use authentication methods like OAuth.",
        "tags": ["APIs", "web development", "Node.js", "RESTful API"],
        "category": "Web Development",
        "image": LMS
    },
    {
        "id": 5,
        "title": "Search Engine Optimization: The Complete Beginner’s Guide",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "SEO is vital for ranking higher on Google. This guide explains keyword research, on-page and off-page SEO, technical SEO, and the latest trends.",
        "tags": ["SEO", "Google ranking", "keyword research", "backlinks"],
        "category": "Marketing",
        "image": LMS
    }
]


const Blog = () => {

    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)

    useEffect(() => {
        const getAllPublsihedBlogs = async () => {
            try {
                const res = await axios.get(`https://mern-blog-ha28.onrender.com/api/v1/blog/get-published-blogs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }
            } catch (error) {
                console.log(error);

            }
        }
        getAllPublsihedBlogs()
    },[])

    return (
        <div className='pt-16'>
            <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-bold text-center pt-10 '>Our Blogs</h1>
                <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />

            </div>
            <div className='max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0'>
                {
                    blog?.map((blog, index) => {
                        return <BlogCard blog={blog} key={index} />
                    })
                }
            </div>
        </div>
    )
}

export default Blog
