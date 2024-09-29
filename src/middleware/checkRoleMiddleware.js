const userModel=require('../models/User');


exports.checkRole= function(roles){

      return async (req,res,next)=>{
      try{
        
        const user=await userModel.findOne({_id:req.user});
        console.log(req.user)

        console.log("llllll",user)
        console.log(roles,"jjjjjjjjjjjjjjjjjjj")
        const roled=user.roles.toString()
        console.log(roled,"kllklkl")
        console.log(roles)
        console.log(roles.includes(roled),"ok");
        if(roles.includes(roled)){
          req.role=roled;
           next();
        }
        else{
   
           return res.status(403).json({
               error:true,
               statusCode:403,    
               message:`${user.name} are not admin to restricted to accessing the resource`
           })
        }
   
       }
      catch(err){
        return res.status(403).json({
            error:true,
            statusCode:403,
            message:err.message
        })
      }
    }
    }
     