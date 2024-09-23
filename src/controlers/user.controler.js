import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import fs, { fdatasync } from "fs"

const registerUser = async(req, res)=>{
    // steps to register user
    // 1. take details from user
    // 2. check existance
    // 3. save in db 
    // 4. check and response user without password
    // 5. redirect to blog_manupulation



    try {
        // 1.
        const {name, userName, email, password} = req.body;
    
    
        // 2.
        const existingData = await User.findOne(
            {$or: [{userName}, {email}]}
        )
    
        if(existingData){ 
            return res.send("User already exists!")
        }
    
    
    
        // 3.
        const userdata = await User.create({
            name,
            userName,
            email,
            password,
        })
    
    
        // 4.
        const createdUser = await User.findById(userdata._id).select("-pasword")
    
        if(!createdUser){
            res.send("User can't created!");
        }
    
        res.send(`User created successfully! \n ${createdUser}`);
    
    
    
        // 5. redirection can be done in frontend
    } catch (error) {
        console.log("Error in registerUser!")
        res.send(`Error in registerUser! \n ${error}`)
    }

}





const loginUser = async(req, res) => {

    // steps for login user
    // 1. take details from user
    // 2. match the details
    // 3. response confirm
    // 4. redirect to blog_manupulation



    try {
        // 1.
        const {email, password} = req.body
    
    
    
    
    
        // 2. 
        const userData = await User.findOne(
            {email}
        )

        if(!userData){
            return res.send("invalid userName/email or password")
        }
    
        if(!(userData.email == email && userData.password == password)){
            return res.send("invalid userName/email or password")
        }
        
    
    
        // 3.
        res.send("User login successfully!")
    
    
    
    
        // 4. redirection can be done in frontend
    } catch (error) {
        console.log(`Error in loginUser! \n ${error}`)
        res.send(`Error in loginUser! \n ${error}`)
    }


}




//steps for add blog
// 1. multer for local torage
// 2. cloudinary url
// 3. save blog in db
// 4. delete from local storage


// 1.
import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})


// 2.
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dimrihemant27', 
    api_key: '754366376743151', 
    api_secret: 'OSudUKDcmX43TWSyNo5066ZqOYM'
});


// 3.

const addBlog = async(req, res) => {
    // steps in func
    // 3.1 multer
    // 3.2 cloudinaty
    // 3.3 save in db
    // 3.4 delete local file
    // 3.5 response


    try {
        // 1.
        const imageLocalStoragePath = req.file.path;                                     
        console.log("imageLocalStoragePath: ",imageLocalStoragePath);

    
    
        // 2.
        let uploadResult;
        try {
            uploadResult = await cloudinary.uploader
            .upload(
                imageLocalStoragePath, {
                    resource_type: "auto",
                }
            )

            console.log("uploadResult succesfully! : \n", uploadResult);
        } catch (error) {
            console.log("uploadResult error: \n", error);
            return res.send(error)
        }
        // .catch((error) => {
        //     console.log(error);
        //     return res.send(error)
        // });
        console.log("uploadResult: ", uploadResult);
    
    
        const imageCloudinaryUrl = uploadResult.secure_url;
        console.log("imageCloudinaryUrl:", imageCloudinaryUrl);
    
        // 3.
        const {title, content} = req.body;
    
        const data = await Blog.create({
            title: title,
            image: imageCloudinaryUrl,
            content: content
        })
    
    
        // 4.
        if(data){
            // fs.unlinkSync(localFilePath)
        }
    
    
        // 5. 
        res.send(`Blog created sucessfully!  \n ${data.title}`)
    } catch (error) {
        console.log("Error in create Blog!");
        res.send(`Error in creating Blog! \n ${error}`)
    }
    
}





const allBlogs = async(req, res)=>{
    try {
        const blogs = await Blog.find({})
        res.send(blogs)
    } catch (error) {
        res.send(`Error in showing blogs! \n ${error}`)
    }
}









export {registerUser, loginUser, addBlog, upload, allBlogs }