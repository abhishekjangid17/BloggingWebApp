import { Blog } from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createBlog = async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) {
            return res.status(400).json({ message: "Blog title and category is required." });
        }
        const blog = await Blog.create({ title, category, author: req.id });
        return res.status(201).json({ success: true, blog, message: "Blog Created Successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to create blog" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const { title, subtitle, description, category } = req.body;
        const file = req.file;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }

        // ✅ Fix 1 & 2: Only update fields that are actually provided
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (subtitle !== undefined) updateData.subtitle = subtitle;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;

        // ✅ Fix 2: Only update thumbnail if a new file is uploaded
        if (file) {
            const fileUri = getDataUri(file);
            const thumbnail = await cloudinary.uploader.upload(fileUri);
            if (thumbnail?.secure_url) {
                updateData.thumbnail = thumbnail.secure_url;
            }
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });
        res.status(200).json({ success: true, message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
    console.log("UPDATE BLOG ERROR:", error); // ✅ in backend
    res.status(500).json({ success: false, message: "Error updating blog", error: error.message });
}
};

export const getAllBlogs = async (_, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'firstName lastName photoUrl' })
            .populate({
                path: 'comments', sort: { createdAt: -1 },
                populate: { path: 'userId', select: 'firstName lastName photoUrl' }
            });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
    }
};

export const getPublishedBlog = async (_, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 })
            .populate({ path: "author", select: "firstName lastName photoUrl" })
            .populate({
                path: 'comments', sort: { createdAt: -1 },
                populate: { path: 'userId', select: 'firstName lastName photoUrl' }
            });

        // ✅ Fix 5: find() returns [], not null
        if (!blogs.length) {
            return res.status(404).json({ message: "No published blogs found" });
        }
        return res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get published blogs" });
    }
};

export const togglePublishBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { publish } = req.query;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }

        // ✅ Fix 4: Respect the query param if provided, otherwise toggle
        blog.isPublished = publish !== undefined ? publish === "true" : !blog.isPublished;
        await blog.save();

        const statusMessage = blog.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({ success: true, message: `Blog is ${statusMessage}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to update status" });
    }
};

export const getOwnBlogs = async (req, res) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const blogs = await Blog.find({ author: userId })
            .populate({ path: 'author', select: 'firstName lastName photoUrl' })
            .populate({
                path: 'comments', sort: { createdAt: -1 },
                populate: { path: 'userId', select: 'firstName lastName photoUrl' }
            });

        // ✅ Fix 5: find() returns [], not null
        if (!blogs.length) {
            return res.status(404).json({ message: "No blogs found.", blogs: [], success: false });
        }
        return res.status(200).json({ blogs, success: true });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const authorId = req.id;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        if (blog.author.toString() !== authorId) {
            return res.status(403).json({ success: false, message: 'Unauthorized to delete this blog' });
        }

        await Blog.findByIdAndDelete(blogId);
        await Comment.deleteMany({ postId: blogId });
        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
};

export const likeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const likeKrneWalaUserKiId = req.id;

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: 'Blog not found', success: false });

        // ✅ Fix 3: Remove blog.save() — updateOne already commits to DB
        await blog.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
        return res.status(200).json({ message: 'Blog liked', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error liking blog", success: false });
    }
};

export const dislikeBlog = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: 'Blog not found', success: false });

        // ✅ Fix 3: Remove blog.save() — updateOne already commits to DB
        await blog.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
        return res.status(200).json({ message: 'Blog disliked', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error disliking blog", success: false });
    }
};

export const getMyTotalBlogLikes = async (req, res) => {
    try {
        const userId = req.id;
        const myBlogs = await Blog.find({ author: userId }).select("likes");
        const totalLikes = myBlogs.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0);
        res.status(200).json({ success: true, totalBlogs: myBlogs.length, totalLikes });
    } catch (error) {
        console.error("Error getting total blog likes:", error);
        res.status(500).json({ success: false, message: "Failed to fetch total blog likes" });
    }
};