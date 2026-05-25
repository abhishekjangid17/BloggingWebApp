import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlogs,
  getMyTotalBlogLikes,
  getOwnBlogs,
  getPublishedBlog,
  likeBlog,
  togglePublishBlog,
  updateBlog
} from "../controllers/blog.controller.js"

const router = express.Router()

// ✅ Static routes FIRST — before any dynamic /:id routes
router.route("/get-all-blogs").get(getAllBlogs)
router.route("/get-published-blogs").get(getPublishedBlog)
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs)
router.get("/my-blogs/likes", isAuthenticated, getMyTotalBlogLikes)

// ✅ Create blog (added singleUpload for thumbnail support)
router.route("/").post(isAuthenticated, singleUpload, createBlog)

// ✅ Delete blog
router.route("/delete/:id").delete(isAuthenticated, deleteBlog)

// ✅ Like / Dislike
router.get("/:id/like", isAuthenticated, likeBlog)
router.get("/:id/dislike", isAuthenticated, dislikeBlog)

// ✅ Dynamic routes LAST — chained properly
router.route("/:blogId")
  .put(isAuthenticated, singleUpload, updateBlog)
  .patch(isAuthenticated, togglePublishBlog)

export default router