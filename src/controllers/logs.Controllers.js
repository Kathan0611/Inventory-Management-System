// middleware/logger.js
const Log = require('../models/logs');

exports.logAction = async (action, model, documentId, changes) => {
  try{
    const log = new Log({
      action,
      model,
      documentId,
      changes,
    });
    await log.save();
  }
  catch(err){
    return res.status(500).json({
      error:true,
      statusCode:500,
      message:err.message,
    })
  }
};

exports.getAllLogAction=async(req,res)=>{
  try{

    const getAll= await Log.find().populate('documentId');
  
    if(!getAll.length>0){
      return res.status(404).json({
         error:true,
         statusCode:404,
         message:"logAction is not found",
        
      })
    }
    else{
  
       return res.status(200).json({
          error:false,
          statusCode:200,
          message:"successfully getAllaction",
          data:getAll
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

exports.singlelogAction=async(req,res)=>{
   try{
      const{documentId}=req.params;

    const getOnelogAction= await Log.findById(documentId);

    if(!getOnelogAction){
      return res.status(404).json({
        error:true,
        statusCode:404,
        message:'SingleLogAction not found'

      })
    }
    else{
      return res.status(200).json({
        error:false,
        statusCode:200,
        message:"Successfully get SingleLogaction",
        data:getOnelogAction
      })
    }
   }
   catch(error){
    return res.status(500).json({
      error:true,
      statusCode:500,
      message:err.message
    })
   }
  
}

// module.exports = logAction;
