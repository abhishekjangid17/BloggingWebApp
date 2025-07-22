import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setBlog } from '@/redux/blogSlice'

const UpdateBlog = () => {
    const editor = useRef(null);
   
    const [loading, setLoading] = useState(false)
    const [publish, setPublish] = useState(false)
    const params = useParams()
    const id = params.blogId
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    const selectBlog = blog.find(blog => blog._id === id)
    const [content, setContent] = useState(selectBlog.description);

    const [blogData, setBlogData] = useState({
        title: selectBlog?.title,
        subtitle: selectBlog?.subtitle,
        description: content,
        category: selectBlog?.category,
    });
    const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const selectCategory = (value) => {
        setBlogData({ ...blogData, category: value });
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setBlogData({ ...blogData, thumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const updateBlogHandler = async () => {

        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("subtitle", blogData.subtitle);
        formData.append("description", content);
        formData.append("category", blogData.category);
        formData.append("file", blogData.thumbnail);
        try {
            setLoading(true)
            const res = await axios.put(`https://mern-blog-ha28.onrender.com/api/v1/blog/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                // dispatch([...course, setCourse(res.data.course)])
                console.log(blogData);


            }
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    const togglePublishUnpublish = async (action) => {
        console.log("action", action);

        try {
            const res = await axios.patch(`https://mern-blog-ha28.onrender.com/api/v1/blog/${id}`, {
                params: {
                    action
                },
                withCredentials: true
            })
            if (res.data.success) {
                setPublish(!publish)
                toast.success(res.data.message)
                navigate(`/dashboard/your-blog`)
            } else {
                toast.error("Failed to update")
            }
        } catch (error) {
            console.log(error);

        }
    }

    const deleteBlog = async () => {
        try {
            const res = await axios.delete(`https://mern-blog-ha28.onrender.com/api/v1/blog/delete/${id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
                navigate('/dashboard/your-blog')
            }
            console.log(res.data.message);

        } catch (error) {
            console.log(error);
            toast.error("something went error")
        }

    }

    return (
        <div className='pb-10 px-3 pt-20 md:ml-[320px]'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
                    <h1 className=' text-4xl font-bold '>Basic Blog Information</h1>
                    <p className=''>Make changes to your blogs here. Click publish when you're done.</p>
                    <div className="space-x-2">
                        <Button onClick={() => togglePublishUnpublish(selectBlog.isPublished ? "false" : "true")}
                        >
                            {selectBlog?.isPublished ? "UnPublish" : "Publish"}
                        </Button>
                        <Button variant="destructive" onClick={deleteBlog}>Remove Course</Button>
                    </div>
                    <div className='pt-10'>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Enter a title" name="title" value={blogData.title} onChange={handleChange} className="dark:border-gray-300" />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input type="text" placeholder="Enter a subtitle" name="subtitle" value={blogData.subtitle} onChange={handleChange} className="dark:border-gray-300" />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <JoditEditor
                            ref={editor}
                            value={blogData.description}
                            onChange={newContent => setContent(newContent)}
                            className="jodit_toolbar"

                        />
                    </div>
                    <div>
                        <Label>Category</Label>
                        <Select onValueChange={selectCategory} className="dark:border-gray-300">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="Web Development">Web Development</SelectItem>
                                    <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                                    <SelectItem value="Blogging">Blogging</SelectItem>
                                    <SelectItem value="Photgraphy">Photgraphy</SelectItem>
                                    <SelectItem value="Cooking">Cooking</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Thumbnail</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-fit dark:border-gray-300"
                        />
                        {previewThumbnail && (
                            <img
                                src={previewThumbnail}
                                className="w-64 my-2"
                                alt="Course Thumbnail"
                            />
                        )}
                    </div>
                    <div className='flex gap-3'>
                        <Button variant="outline" onClick={()=>navigate(-1)}>Back</Button>
                        <Button onClick={updateBlogHandler}>
                            {
                                loading ? "Please Wait" : "Save"
                            }
                        </Button>
                    </div>

                </Card>
            </div>
        </div>
    )
}

export default UpdateBlog
