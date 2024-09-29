const Category= require('../models/Category');
const logAction=require('./../controllers/logs.Controllers');

//createCategory
exports.createCategory=async (req,res)=>{
    try{
        const {Categoryname}=req.body;
        

        const existCategory= await Category.findOne({Categoryname: Categoryname})

        if(existCategory){
            return res.status(200).json({
                error:true,
                statusCode:200,
                message:'Category already exists'
            })
        }
        const createCategory= await Category.create({
            Categoryname
        })
        

        if(!createCategory){
            return res.status(400).json({
                error:true,
                statusCode:400,
                message:'Category is not created'
            })
        }
        else{
            await logAction.logAction('Create','Category',createCategory._id,'CreateCategory');

            return res.status(200).json({
                error:false,
                statusCode:200,
                message:'Category created successfully',
                data:createCategory
            })
        }
    }
    catch(err){
        return res.status(500).json({
            error:true,
            message:err.message,
        })
    }
}

//getAll Categories
exports.getAllCategory= async(req,res)=>{
    try{
         const getAllCategory= await Category.find({});
         if(!getAllCategory.length>0){
            return res.status(404).json({
                error:true,
                statusCode:404,
                message:"No categorys found"
            })
         }
         else{

            await logAction.logAction('GET','Category',getAllCategory._id,'getCategory');

             return res.status(200).json({
                error:false,
                statusCode:200,
                message:'All categories Found' ,
                data:getAllCategory
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

//getSingleCategory
exports.singleCategory= async(req,res)=>{
    try{

        const {id}=req.params;
        const getSingleCategory=await Category.findOne({id});

        if(!getSingleCategory){
            return res.status(404).json({
                error:true,
                statusCode:404,
                message:'Category not found'
            })
        }
        else{
            await logAction.logAction('GET','Category',getSingleCategory._id,'singleCategory');

            return res.status(200).json({
                error:false,
                statusCode:200,
                message:'getSingleCategory successfully found'  
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

///upadteCategory
exports.updateCategory= async (req,res)=>{
     try{

        const {id}=req.params;
        const {Categoryname}=req.body;
        
        const existingCategory= await Category.findById(id);

        if(!existingCategory){
            return res.status(404).json({
                error:true,
                statusCode:404,
                message:'Cateogry not found'
            })
        }
        else{

            const updateCategory= await Category.findByIdAndUpdate(id,{Categoryname:Categoryname},{new:true});

            if(!updateCategory){
                return res.status(400).json({
                    error:true,
                    statusCode:400,
                    message:'Category not found'
                })
            }
            await logAction('update','Category',updateCategory._id,'updateCategory');

            return res.status(200).json({
                error:false,
                statusCode:200,
                message:'Category updated Successfully'
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

//deleteCategory
exports.deleteCategory= async(req,res)=>{
    try{
        
       const {id}=req.params;
       const deleteCategory= await Category.findByIdAndDelete(id);
       if(!deleteCategory){
        return res.status(404).json({
            error:true,
            statusCode:404,
            message:'Category not found'
        })
       }
       else{
        await logAction.logAction('DELETE','Category',deleteCategory._id,'deleteCategory');
        
        return res.status(200).json({
            error:false,
            statusCode:200,
            message:'Category deleted successfully'
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