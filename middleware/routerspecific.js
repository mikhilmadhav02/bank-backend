const jwt = require('jsonwebtoken')

exports.loginmiddleware=(req,res,next)=>{
    console.log('router specific middleware');
const token = req.headers.token
console.log(token);
try{
    const{loginkey} = jwt.verify(token,"secretkey12345")
console.log(loginkey);
req.debitacno=loginkey
    next()
}catch{
    res.status(401).json("unaccepted error happens,please Re login to continue ")
}
}
