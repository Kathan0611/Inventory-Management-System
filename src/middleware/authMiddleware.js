const jwt = require("jsonwebtoken");
const env=require('../../config/env');

const validateRequest = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];  
    console.log(token)
    console.log(req.headers.authorization,"lkkklklklkl");

    if (!token) {
      return res.status(401).json({ message: "token is not found" });
    }          
   
    const decoded = await jwt.verify(token,env.Atoken);
    // console.log(decoded.id,"io");
    console.log(decoded)

    if (!decoded.id) {
      return res.status(401).json({ message: "User is not found" });
    }
    req.user = decoded.id;
    console.log(req.user,"niyati")
    next();
  } catch (err) {
    return res.status(401).json({ message: "token is not valid" });
  }
};

module.exports = validateRequest