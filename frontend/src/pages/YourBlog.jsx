import { Card } from '@/components/ui/card'
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// const invoices = [
//     {
//         invoice: "INV001",
//         paymentStatus: "Paid",
//         totalAmount: "$250.00",
//         paymentMethod: "Credit Card",
//     },
//     {
//         invoice: "INV002",
//         paymentStatus: "Pending",
//         totalAmount: "$150.00",
//         paymentMethod: "PayPal",
//     },
//     {
//         invoice: "INV003",
//         paymentStatus: "Unpaid",
//         totalAmount: "$350.00",
//         paymentMethod: "Bank Transfer",
//     },
//     {
//         invoice: "INV004",
//         paymentStatus: "Paid",
//         totalAmount: "$450.00",
//         paymentMethod: "Credit Card",
//     },
//     {
//         invoice: "INV005",
//         paymentStatus: "Paid",
//         totalAmount: "$550.00",
//         paymentMethod: "PayPal",
//     },
//     {
//         invoice: "INV006",
//         paymentStatus: "Pending",
//         totalAmount: "$200.00",
//         paymentMethod: "Bank Transfer",
//     },
//     {
//         invoice: "INV007",
//         paymentStatus: "Unpaid",
//         totalAmount: "$300.00",
//         paymentMethod: "Credit Card",
//     },
// ]

const YourBlog = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    console.log(blog);


    const getOwnBlog = async () => {
        try {
            const res = await axios.get(`https://mern-blog-ha28.onrender.com/api/v1/blog/get-own-blogs`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setBlog(res.data.blogs))
            }
        } catch (error) {
            console.log(error);

        }
    }
    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete(`https://mern-blog-ha28.onrender.com/api/v1/blog/delete/${id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
            }
            console.log(res.data.message);

        } catch (error) {
            console.log(error);
            toast.error("something went error")
        }

    }
    useEffect(() => {
        getOwnBlog()
    }, [])


    const formatDate = (index) => {
        const date = new Date(blog[index].createdAt)
        const formattedDate = date.toLocaleDateString("en-GB");
        return formattedDate
        // console.log("formattedDate", date);

    }

    return (
        <div className='pb-10 pt-20 md:ml-[320px] h-screen'>
            <div className='max-w-6xl mx-auto mt-8 '>
                <Card className="w-full p-5 space-y-2 dark:bg-gray-800">

                    <Table>
                        <TableCaption>A list of your recent blogs.</TableCaption>
                        <TableHeader className="overflow-x-auto" >
                            <TableRow>
                                {/* <TableHead className="w-[100px]">Author</TableHead> */}
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-x-auto ">
                            {blog?.map((item, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell className="font-medium">{item.author.firstName}</TableCell> */}
                                    <TableCell className="flex gap-4 items-center">
                                        <img src={item.thumbnail} alt="" className='w-20 rounded-md hidden md:block' />
                                        <h1 className='hover:underline cursor-pointer' onClick={() => navigate(`/blogs/${item._id}`)}>{item.title}</h1>
                                    </TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell className="">{formatDate(index)}</TableCell>
                                    <TableCell className="text-center">
                                        {/* <Eye className='cursor-pointer' onClick={() => navigate(`/blogs/${item._id}`)} />
                                        <Edit className='cursor-pointer' onClick={() => navigate(`/dashboard/write-blog/${item._id}`)} />
                                        <Trash2 className='cursor-pointer' onClick={() => deleteBlog(item._id)} /> */}
                                        
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><BsThreeDotsVertical/></DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[180px]">
                                                <DropdownMenuItem onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}><Edit />Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-500" onClick={() => deleteBlog(item._id)}><Trash2 />Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter> */}
                    </Table>

                </Card>
            </div>
        </div>
    )
}

export default YourBlog
