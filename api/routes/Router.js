const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const session = require('express-session')
const User = require('../models/User')
users.use(cors())
process.env.SECRET_KEY = 'secret'
users.post('/register', (req, res) => {
    console.log(req.body);
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    }
  
    User.findOne({
      email: req.body.email
    })
    .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
              .then(user => {
                res.json({ status: user.email + 'Registered!' })
              })
              .catch(err => {
                res.send('error: ' + err)
              })
          })
        } else {
          res.json({ error: 'User already exists' })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})
users.post('/login', (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              _id: user._id,
              name: user.name,
              phone: user.phone,
              email: user.email
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.send(token);
          } else {
            res.json({ error: 'Wrong Password' })
          }
        } else {
          res.json({ error: 'User does not exist' })
        }
    })
    .catch(err => {
    res.send('error: ' + err)
    })
})
users.post('/update',function(req,res){  
  let hashPass;  
  console.log(req.body.password);
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      setTimeout(()=>{
        hashPass = hash;
        res.json({ newPass : hashPass })
        const filter = { email: req.body.email };
        const update = { password: hashPass };
        async function s1(){
          let doc = await User.findOneAndUpdate(filter, update, {
            new: true
          });
          console.log(doc.email);
        }
        s1();
      },200)
    });
  });
}); 

module.exports = users