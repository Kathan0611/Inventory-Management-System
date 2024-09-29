const Joi=require('joi');


const registerSchema= Joi.object({
    name:Joi.string().trim().required(),
    email:Joi.string().email().trim().required(),
    password:Joi.string().trim().required(),
    // mobilenum: Joi.string().length(10).required()
     
});

const loginSchema= Joi.object({
    email: Joi.alternatives().try(
        Joi.string().email().trim().required(),
        Joi.string().trim().required()
      ),
     password:Joi.string().trim().required()
})


const categoryName=Joi.object({
    categoryName:Joi.string().trim().required()
})

const AddProductSchema=Joi.object({
    Name:Joi.string().trim().required(),
    Description:Joi.string().required(),
    Category:Joi.string().required(),
    Image:Joi.string().trim().required(),
    ISBN:Joi.string().trim().required(),
    TotalQuantity:Joi.number().required(),
    Price:Joi.number().required(),
 
})


module.exports={
    registerSchema,
    loginSchema,
    resetPassword,
    newpassword,
    forgotpassword,
    verifyOtp,
    categoryName,
    AddProductSchema,
    bookName
}
