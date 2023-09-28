// import model

const users = require('../Models/userScheme')
const jwt = require('jsonwebtoken')
// register
exports.register = async (req,res)=>{
 console.log(req.body);
  const {username ,password ,acno} = req.body
  if(!username || !password || !acno){
  res.status(403).json("enter all details")
  }else{
     
    try{
      const userresponse = await users.findOne({acno:acno})

      console.log(`checked whether acno is in database=${userresponse}`);
      if(userresponse){
        res.status(200).json(`${userresponse.username}, already exists`)
        console.log(userresponse);
      }else{
        const newuser = new users({
          username,
          password,
          acno,
          balance:5000,
          transactions:[]
        })
        await newuser.save()
        console.log('registered');
        res.status(200).json('registered succesfully')
      }
    }catch(error){
      res.status(402).json(`error= ${error}`)
    }
   }
  }

// login logic

exports.login = async (req,res)=>{
  console.log(req.body);
  
 const {acno,password}=req.body
 
 try{
 const response =await users.findOne({acno:acno,password})
 if(response){
   const token =jwt.sign({loginkey:acno},"secretkey12345")
  res.status(200).json({response,token})
 }else{
  res.status(404).json("invalid details")
 }

 }catch(error){
  res.status(401).json(`error in server= ${error}`)
 }


}

// balance logic
exports.balance = async (req,res)=>{
 let acno=req.params.acno
  console.log(req.params.acno);
try{

  
if(acno){
const loginacno=await users.findOne({acno})
res.status(200).json(`${loginacno.balance}`)
console.log(loginacno);

}else{
  res.status(402).json(`acno values not available in server`)
  console.log('values not available in server');
}

}catch(error){
  res.status(403).json(`error in server side try`)
}



}


// fund transfer
exports.transfer=async (req,res)=>{
 const{creditacno,amount,debitpassword}=req.body
  const {debitacno}=req
  console.log(`amount= ${amount}`);
  console.log(`debitacno=${debitacno }`);



 try{

  const debituser = await users.findOne({acno:debitacno,password:debitpassword})
  console.log('debituser=',debituser);
const credituser = await users.findOne({acno:creditacno})
console.log('credituser=',credituser);
// amount string to numbe if needed
let amt = Number(amount)

if(debitacno==creditacno){
  res.status(406).json("invalid details, self transfer is not possible")
}else{

  if(debituser && credituser){
    if(debituser.balance>=amt){
     debituser.balance-=amt
    debituser.transactions.push({
      transaction_type:"DEBIT" ,
      
      creditacno:credituser.acno,
      amount:amt
    })
    debituser.save()
    
    credituser.balance+=amt
    credituser.transactions.push({
      transaction_type:"CREDIT",
      debitacno:debituser.acno,
     
      amount:amt
    })
    credituser.save()
    
    res.status(201).json("amount transfered successfully")
    }else{
      res.status(406).json("insufficient amount")
    }
    }else{
      res.status(401).json('debit/credit details not available')
    }

}

 }catch(error){
  res.status(400).json('error in try')
 }


}

// statements
exports.statements= async(req,res)=>{
  console.log('current acno',req.debitacno);
  const {debitacno}=req

  const preuser = await users.findOne({acno:debitacno})

  res.status(200).json(preuser.transactions)
  console.log(preuser.transactions);
}


// delete accounts
exports.delete=async (req,res)=>{
  const acno = req.debitacno
   console.log(`current acno ${acno}`);
const user =await users.findOne({acno})
console.log(user);

 if(user){
  await users.deleteOne({acno})
  res.status(200).json("deleted succesfully")
 }else{
  res.status(400).json("user already deleted")
 }


}


  // 

  // const response = await users.findOne({acno})
  // if(response){
  //  console.log(response);
  //  res.status(403).json("user already exists")
  
  // }else{
  //  const newuser = await new users({
  //    username,
  //    password,
  //    acno,
  //    balance:5000,
  //    transactions:[]
  //  })
  //  await newuser.save()
  // res.status(200).json(newuser)
  //  }


  // 






// import model

// const users = require('../Models/userScheme')

// exports.register = async (req,res)=>{
//     console.log(req.body);
//   const  {username,acno,password} = req.body
//   if(!username || !acno || !password){
//     res.status(415).json("all inputs are required")
//   }
// try{
  
//     const response = await users.findOne({acno})
//     if(response){
//       console.log('respons available');
//       res.status(410).json('user already exists')
//     }else{
//       console.log('response not available');
//       const newuser= new users({
//             username,
//             password,
//             acno,
//             balance:5000,
//             transactions:[]

//       })
//      await newuser.save()
//      res.status(200).json(`data stored succesfully${newuser}`)
//     }
    
    
// }catch(error){
//   console.log('error happened at ',error);
//     res.status(420).json(error)
// }
// }