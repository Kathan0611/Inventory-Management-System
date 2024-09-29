const mongoose=require('mongoose');


const ProductSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Stock:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    Image:{
        type:String,
        required:true
    }
    
},{
    timestamps:true
})

const Product=mongoose.model('Product',ProductSchema);

module.exports=Product;