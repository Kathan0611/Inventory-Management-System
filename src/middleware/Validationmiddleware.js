const validators=require('./../utils/validateSchema');

const Joi = require('joi'); 
  

module.exports = function (schema) {
  return async function (req, res, next) {
    try {

      // console.log(req.body)
      const { error, value } = await schema.validate(req.body);
      console.log(error,value ,"kkkkkkkkkkkkkk")
      if (error) {
        return res.status(400).json({
          success: false,
          data: null,
          message: error.details[0].message.replace(/"/g, ''), 
        });
         
      }

      req.body = value; 
      console.log(req.body);
      next();
    } catch (err) {
      
      console.error(err);
     return res.status(500).json({
        success: false,
        data: null,
        message: err.message,
      });
    }
  };
};

