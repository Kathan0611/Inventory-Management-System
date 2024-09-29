const userModel=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const env=require('./../../config/env')
const path=require('path');
const logAction = require('./logs.Controllers');
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
 });
 
//REGISTER_USER
exports.signup= async(req,res)=>{
    const{email,name,password}=req.body;
    try{

        const existingUser=await userModel.findOne({email});
       
        if(existingUser){
            return res.status(400).json({
                error:true,
                statusCode:400,
                message:'Email already registered'
            });
        }
        else{
            const salt= await bcrypt.genSalt(10);
            
            const newUser= await userModel.create({
                email,
                name,
                password:bcrypt.hashSync(password,salt)
            })
           

            if(!newUser){
                return res.status(400).json({
                    error:true,
                    statusCode:400,
                    message:"somehow user not created"
                })
            }

            await logAction.logAction('Create','User',newUser._id,'UserCreated')

            return res.status(200).json({
                error:false,
                statusCode:200,
                message:'User registered successfully',
                data:newUser
            })
        }
    }
    catch(err){
  
        return res.status(500).json({
            error:true,
            statusCode:500,
            message:err.message
        })
    }
}

//USER_LOGIN
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await userModel.findOne({email});

        if(!user){
            return res.status(404).json({
                error:true,
                statusCode:404,
                message:'User not found'
            })
        }
        else{
            
            const validatePassword= await bcrypt.compareSync(password,user.password);
            
            if(!validatePassword){
                return res.status(401).json({
                    error:true,
                    statusCode:401,
                    message:"Unauthorized user"
                })
            }
            
            const Atoken= await jwt.sign({id:user.id},env.Atoken)

            await logAction.logAction('login','User',user._id,'Userlogin')

            return res.status(200).json({
                error:false,
                statusCode:200,
                message:'User logged in successfully',
                data:{user,Atoken}
            })
        }
    }
    catch(err){
        return res.status(500).json({
            error:true,
            statusCode:500,
            message:err.message
        })
    }
}

//getALLUSER
exports.getAllUser=async(req,res)=>{
    try{
        const users=await userModel.find({});

        if(!users.length>0){

            return res.status(200).json({
                error:true,
                statusCode:404,
                message:"No user found"
            })
        }

        await logAction.logAction('GET','User',users._id,'getAllUser')
        return res.status(200).json(
            {
                error:false,
                statusCode:200,
                message:'All users fetched successfully',
                data:users
            }
        )
    }
    catch(err){
        return res.status(500).json(
            {
                error:true,
                statusCode:500,
                message:err.message
            }
        )
    }
}

//singleUser
exports.singleUser= async(req,res)=>{
    const{id}=req.params;
    try{
        
       const user= await userModel.findById(id);

       if(!user){
        return res.status(400).json({
            error:true,
            statusCode:404,
            message:'user not found'
        })
       }
       else{
        await logAction.logAction('GET','User',user._id,'getSingleOne')
        return res.status(200).json({
            error:false,
            statusCode:200,
            message:"User getting successfully",
            data:user
        })
       }
    }
    catch(err){
        return res.status(500).json({
             error:true,
             statusCode:500,
             message:err.message
        })
    }
}

//getAllUsers
exports.getAllUser =async (req, res) => {
     try{
     const getAllusers = await userModel.find({roles:'user'});
     console.log(getAllusers)

         if (!getAllusers.length > 0) {
             return res.status(404).json({
                 error: true,
                 statusCode: 404,
                 message: 'Users not getting Successfully'
             })
         }
         else {
            await logAction.logAction('GET','User',user._id,'getSingleOne')
             return res.status(200).json({
                 error: false,
                 statusCode: 200,
                 message: 'getAllUser Successfully',
                 data: getAllusers
             })
         }
     }
     catch(err){
        return res.status(500).json({
            error:true,
            statusCode:500,
            message:err.message
        })
     }
     
}

//updateUser
exports.updateUser =async (req, res) => {
  
    try{
        
        const userId=req.user;
        console.log(userId,"jkk");
        let data;
        
        const {name}=req.body;
        
        console.log(req.body,"kllllllll")
        console.log(req?.file,"deep")
      
         if(req.file){
             const filePath = path.resolve(__dirname , '../uploads/'+ req?.file?.filename);
             const newFilePath = filePath.replace('src' + path.sep,'');
             console.log(newFilePath)
             console.log('filePath is not defined');
                  data= await cloudinary.uploader.upload(newFilePath, {
                    folder: 'library', // Optional - specify a folder in Cloudinary
                    resource_type: 'auto' // Specify the type of resource (image, video, raw)
                  });
                  console.log(data)
            }
            
        console.log(userId,"kl")
        const existUser= await userModel.findById(userId);

        console.log("existUser",existUser) 
        
        if(!existUser){
        
            return res.status(404).json({
                error:true,
                statusCode:404,
                message:'User not found for updation'
            })
        }
        else {
        
            const updateObj = {
                name, 
                BannerImage: req?.file ? data.secure_url :null
            }
          
            const updateuser = await userModel.findByIdAndUpdate(userId,updateObj,{new:true});
            console.log(updateuser)
            if (!updateuser) {
                return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    message: 'User not updated successfully'
                })
            }
            else {
                await logAction.logAction('update','User',updateuser._id,'updateUser')
                return res.status(200).json({
                    error: false,
                    statusCode: 200,
                    message: 'User updated successfully',
                    data:updateuser
                })
            }
    } 
    }
    catch(err){
        return res.status(500).json({
            error:true,
            statusCode:500,
            message:err.message
        })
    }

}

//deleteUser
exports.deleteUser =async (req, res) => {
    try{
        const { id } = req.params;
        const singleuser = await userModel.findById(id);
         
        if (!singleuser) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                message: 'User already deleted'
            })
        }
        else {
    
            const deleteduser = await userModel.findByIdAndDelete(id)
    
            if (!deleteduser) {
    
                return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    message: 'not status updated'
                })
            }
            else {
                await logAction.logAction('delete','User',deleteduser._id,'deleteUser');
                return res.status(200).json({
                    error: false,
                    statusCode: 200,
                    message: 'successfully deleteUser',
                    data:deleteduser
                })
            }
    
        }
    }
    catch(err){
        return res.status(500).json({
            error:true,
            statusCode:500,
            message:err.message
        })
    }
    
}


