import { User } from "../models/user.model";

const registerUser = async(req, res)=>{
    // steps to register user
    // 1. take details from user
    // 2. check existance
    // 3. save in db 
    // 4. check and response user without password
    // 5. redirect to blog_manupulation



    // 1.
    const {namee, username, email, password} = req.body;


    // 2.
    const existingData = await User.findone(
        {$or: [{username}, {email}]}
    )

    if(existingData){ 
        return res.status(400).send("User already exists!")
    }



    // 3.
    const userdata = await User.create({
        name,
        username,
        email,
        password,
    })


    // 4.
    const createdUser = await User.findById(userdata._id).select("-pasword")

    if(!createdUser){
        res.status(500).send("User can't created!");
    }

    res.status(200).send("User created successfully! \n", createdUser);



    // 5. redirection can be done in frontend

}





const loginUser = async(req, res) => {

    // steps for login user
    // 1. take details from user
    // 2. match the details
    // 3. response confirm
    // 4. redirect to blog_manupulation



    // 1.
    const {username, email, password} = req.body





    // 2. 
    const userData = await User.findone(
        {$or: [{username}, {email}]}
    )

    if(!(userData.username == username || userData.email == email || userData.password == password)){
        return res.status(400).send("invalid username/email or password")
    }



    // 3.
    res.status(200).send("User login successfully!")




    // 4. redirection can be done in frontend


}









export {registerUser, loginUser, }