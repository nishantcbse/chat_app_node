/** @namespace req.query.user_name */
const mysql = require('../models/mysql');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = new express.Router();
router.get('/', (req, res) => {
    res.sendFile(publicDir+'/index.html');
});
router.post('/api/login', async (req, res)=> {
    let user = await mysql.user.authUser(req.body.username);
    if(user.length > 0)
     {
        if(validPassword(req.body.password, user[0].password ))
        {
           let token = jwt.sign({id: user[0].id}, process.env.JWT_SECRET, {});
           let $user = {
            token: token,
            name:user[0].name,
            username:user[0].username
           };
            
            res.json({'status':true, 'data':$user})
        }
        else
        {
           res.json({'status':false, 'data':user[0].username})
        }
     }
     else
     {
        res.json({'status':false,'data': user});
     }
  });
router.post('/api/signup', async (req, res)=>{
     let results = await mysql.user.getUserByUsername(req.body.username);
     if(results.length > 0){
        res.json({'status':false, 'msg':'username already taken'})
     }else{
        let user = await mysql.user.insert(
            req.body.name, 
            req.body.username, 
            req.body.password
          );
        res.json({'status':true,'data': user});
     }
  });
router.get('/api/messages', async (req, res)=>{
     let results = await mysql.messages.getAllMessages();
     
    res.json({'status':false, 'data':results})
    
});
router.post('/api/passwordChange', async (req, res)=> {
    let user = await mysql.user.authUser(req.body.username);
    if(user.length > 0){
        if(validPassword(req.body.current_password, user[0].password )){
             let $user = await mysql.user.changePassword(user[0].id, req.body.new_password);
              res.json({'status':true,'msg': 'password changed'});
        }
        else
        {
           res.json({
                status:false, 
                erros:{
                current_password:'The supplied current password is invalid'
               }
            })
        }
     }
     else
     {
        res.json({'status':false,'erros': 'user not found'});
     }
});
router.post('/api/updateDetails', async (req, res)=> {
    let user = await mysql.user.getUserByUsername(req.body.username);
    if(user.length > 0){
       let $user = await mysql.user.updateDetails(user[0].id, req.body.name);
       res.json({'status':true,'msg': 'Details have been updated'});
       
     }
     else
     {
        res.json({'status':false,'erros': 'user not found'});
     }
});
router.post('/api/get_user', async (req, res)=> {
    let user = await mysql.user.getUserByUsername(req.body.username);
    if(user.length > 0){
      
       res.json({'status':true,'data': user[0]});
       
     }
     else
     {
        res.json({'status':false,'erros': 'user not found'});
     }
});


module.exports = router;