exports.appmiddleware =(req,res,next)=>{
console.log('app specific middleware');
next()
}