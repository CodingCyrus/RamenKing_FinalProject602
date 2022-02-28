const express = require("express");
const router = express.Router();
const User = require("../models/userModel")

//register user data into mongoDB
router.post("/register", (req,res) => {
    const {name, email, password} = req.body
    const newUser = new User({name, email, password})

    try {
        newUser.save()
        res.send("User Register Success")
    } catch(error) {
        return res.status(400).json({ message: error});
    }
});

//find objects with user email and password in mongoDB user array
//if email and password matches in mongoDB will get user if not error message
router.post("/login", async (req,res) => {
    const {email , password} = req.body

    try {
        const user = await User.find({email, password})

        if(user.length > 0) {
            const currentUser = {
                name : user[0].name,
                email : user[0].email,
                isAdmin : user[0].isAdmin,
                _id : user[0]._id
            }
            res.send(currentUser);
        } else {
            return res.status(400).json({ message: 'User Login Failed'});
        }

    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong with user login'});
    }
});

//get all users data into admin page from mongodb if success, try catch error if not loaded
router.get("/getallusers", async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({message : error})
    }
})

//post request to delete user from database 
router.post("/deleteuser", async(req,res) => {
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send("User Deleted Successfully")
    } catch (error) {
        return res.status(400).json({message : error})
    }
});
module.exports = router