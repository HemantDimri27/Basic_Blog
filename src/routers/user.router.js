import { Router } from "express";
import { registerUser, loginUser, addBlog, upload, allBlogs } from "../controlers/user.controler.js";


const router = Router()

router.route('/').get(allBlogs)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/add').post(upload.single("image"), addBlog)



export default router