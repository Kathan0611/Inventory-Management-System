const {app}=require('../assesement/server');
const connect=require('./config/db')

connect()
app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})
