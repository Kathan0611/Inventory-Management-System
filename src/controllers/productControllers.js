const  mongoose=require('mongoose');
const Product=require('../models/Products');
const logAction = require('./logs.Controllers');
const cloudinary=require('cloudinary').v2
const path=require('path');

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
 });
 
//createProduct  

exports.createProduct=async (req,res)=>{
    try{
        let uploadResult;
       const {Name,Price, Description,Stock,Category}=req.body;
       console.log(req.body)
       const{Image}=req.file;
       console.log(req.file,"klkklklkkkkkkk")
    

       if(req.file){
        const filePath = path.resolve(__dirname , '../uploads/'+ req?.file?.filename);
        const newFilePath = filePath.replace('src' + path.sep,'');
       
           uploadResult=await cloudinary.uploader.upload(newFilePath,{
              resource_type:'auto',
              folder: 'library'
           })

        console.log(uploadResult)
       }
       const product= await Product.create({Name,Price,Description,Stock,Category,Image:uploadResult.secure_url});

       if(!product){
        return res.status(400).json({
            error:true,
            statusCode:400,
            message:'Product is not created'
        })
       }
       else{

          await logAction.logAction('create','Product',product._id,'Productcreated')
          
         return res.status(200).json({
            error:false,
            statusCode:200,
            message:'Product Created Successfully',
            data:product
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

//getALLproducts  
exports.getAllProduct=async(req,res)=>{
    try{
         const products=await Product.find({});

         if(!products.length>0){
            return res.status(200).json({
                error:true,
                statusCode:404,
                message:'No products found'
            })
         }
         return res.status(200).json({
             error:false,
             statusCode:200,
             data:products
         })
    }
    catch(err){
        return res.status(500).json({
            error:true,
            statusCode:500,
            message:err.message
        })
    }
}

//singleProduct  
exports.singleProduct=async(req,res)=>{
    const {id}=req.params;
    try{
      const product= await Product.findOne({id:id})
    if(!product){
        return res.status(404).json({
            error:true,
            statusCode:404,
            message:'Product not found'
        })
    }
    await logAction.logAction('GET','Product',product._id,'singleProduct')

    return res.status(200).json({
        error:false,
        statusCode:200,
        data:product
    })
}
    catch(err){
        return res.status(500).json({
            error:true,
            statusCode:500,
            message:err.message
        })
    }
}

//updateProduct  
exports.updateProduct=async(req,res)=>{
    try{  
        const {id}=req.params;
        const {Name,Price,Description,Stock,Category,Image}=req.body;   
        if(!Name || !Price || !Description || !Stock || !Category || !Image){
            return res.status(400).json({
                error:true,
                statusCode:400,
                message:'All fields are required'
            })
          }
        
        const product=await Product.findByIdAndUpdate(id,{Name,Price,Description,Stock,Category},{new:true});

         if(!product){
            return res.status(404).json({
                error:true,
                statusCode:404,
                message:'product is not updated'
            })
         }
         else{

            await logAction.logAction('update','Product',product._id,'updatedProduct');

            return res.status(200).json({
                error:false,
                statusCode:200,
                message:'Product updated successfully'
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

 
//deleteProduct  
exports.deleteProduct=async(req,res)=>{
    try{
            const {id}=req.params;
            const product=await Product.findByIdAndDelete(id);
            if(!product){
                return res.status(404).json({
                    error:true,
                    statusCode:404,
                    message:'Product not found'
                })
            }
            else{
                await logAction.logAction('delete','Product',product._id,'deleteProduct');

                return res.status(200).json({
                    error:false,
                    statusCode:200,
                    message:'Product deleted successfully'
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

