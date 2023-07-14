// impprt express
const express = require('express')
const middleware = require('../middleware/routerspecific')
const router = new express.Router()

const usercontroler = require('../controller/usercontroler')



// register
router.post('/employee/register',usercontroler.register)

// login
router.post('/employee/login',usercontroler.login)
// balance
router.get('/employee/balance/:acno',middleware.loginmiddleware,usercontroler.balance)

// fund transfer
router.post('/employee/transfer',middleware.loginmiddleware,usercontroler.transfer)
// statememnts
router.get('/employee/statements',middleware.loginmiddleware,usercontroler.statements)
// delete accoutn
router.delete('/employee/delete',middleware.loginmiddleware,usercontroler.delete)
module.exports=router