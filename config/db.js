const mongoose=require('mongoose');
const env=require('./../config/env');

async function connect(){
    try{
        
       await mongoose.connect(env.MONGO_URL);
       console.log('Connect to MongoDB')
    }
    catch(err){
        console.error('Error connnecting to  mongoose',err.message)
    }

}

module.exports=connect;
