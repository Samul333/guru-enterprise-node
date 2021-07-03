const route = require('express').Router() 
const { createNewUser,getAllUsers,loginUser,logoutAll,logout,getCurrentUser,verifyToken } = require('../handler/UserRouteHandler');
const auth = require('../middleware/auth')
const userCheck = require('../middleware/userCheck');

route.post('/',(req,res)=>createNewUser(req,res))

route.get('/',(req,res)=>getAllUsers(req,res))

route.post('/login',(req,res)=>loginUser(req,res))

route.get('/login',userCheck,(req,res)=>getCurrentUser(req,res))

route.post('/logoutAll',auth,(req,res)=>logoutAll(req,res))

route.post('/logout',auth,(req,res)=>logout(req,res))

route.get('/verify/:token',(req,res)=>verifyToken(req,res))

module.exports = route;