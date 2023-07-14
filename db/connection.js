// nodeapp and mongodb dtabase connectivity
const mongoose =require('mongoose')

const connectionstring = process.env.database

mongoose.connect(connectionstring,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then((response)=>{
console.log(`connected , response=${response}`);
}).catch((error)=>{
    console.log(`error=${error}`);
}) 