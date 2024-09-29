const express=require('express');
const app=express();
const userRouter=require('./src/routes/userRouter');
const catgoryRouter=require('./src/routes/CategoryRouter');
const productRouter=require('./src/routes/ProductRouter');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/userRouter',userRouter);
app.use('/categoryRouter',catgoryRouter);
app.use('/productRouter',productRouter);



module.exports={app};