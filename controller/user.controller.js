const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const UserServices = require("../services/user.services");
const userServices = new UserServices();
const jwt = require("jsonwebtoken");

// Registration
exports.registerUser = async(req,res) =>{
    try {
        let imagePath = "";
        let user = await userServices.user({email:req.body.email,isDelete:false});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        if(req.file){
            console.log(req.file.path);
            imagePath = req.file.path.replace("\\","/");
        }

        let hashPassword = await bcrypt.hash(req.body.password,10);
        console.log(hashPassword);
        
        user = await User.create({...req.body,password:hashPassword,profileImage:imagePath});
        user.save();
        res.status(201).json({user,message:"User registered successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// Login User

exports.loginUser = async(req,res) => {
    try {
        let user = await userServices.user({email:req.body.email,isDelete:false});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        let matchPassword = await bcrypt.compare(req.body.password,user.password)
        if(!matchPassword){
            return res.status(404).json({message:"Email or Password not match"})
        }
        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.status(201).json({user,message:"Login Successful",token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// Get All User
exports.getAllUser = async(req,res) =>{
    try {
        let users = await User.find({isDelete : false});
        res.status(200).json(users);
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

// 

// User Profile
exports.userProfile = async(req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// updateProfile
exports.updateProfile = async (req,res) =>{ 
    try {
       let user = req.user;
       user = await userServices.update(user._id, req.body);
       res.status(202).json({user,message:"User update success"}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// Delete User

exports.deleteUser = async(req,res) => {
    try {
        let user = req.user;
        user = await userServices.delete(
            user._id,
            {isDelete:true},
            {new:true}
        );
        res.status(202).json({user,message:"User Delete Success "})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}