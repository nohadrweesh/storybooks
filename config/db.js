const mongoose = require('mongoose')
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{//disable console errors
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log(`Mongo db connected : ${conn.connection.host}`)

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB