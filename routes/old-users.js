// const {User} = require('../models/user');
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// router.get(`/`, async (req, res) =>{
//     const userList = await User.find().select('-passwordHash');

//     if(!userList) {
//         res.status(500).json({success: false})
//     }
//     res.send(userList);
// })

// // router.get('/:id', async(req,res)=>{
// //     const user = await User.findById(req.params.id).select('-passwordHash');

// //     if(!user) {
// //         res.status(500).json({message: 'The user with the given ID was not found.'})
// //     }
// //     res.status(200).send(user);
// // })

// router.post('/', async (req,res)=>{

//     user = await user.save();

//     if(!user)
//     return res.status(400).send('the user cannot be created!')

//     res.send(user);
// })

// // router.put('/:id',async (req, res)=> {

// //     const userExist = await User.findById(req.params.id);
// //     let newPassword
// //     if(req.body.password) {
// //         newPassword = bcrypt.hashSync(req.body.password, 10)
// //     } else {
// //         newPassword = userExist.passwordHash;
// //     }

// //     const user = await User.findByIdAndUpdate(
// //         req.params.id,
// //         {
// //             name: req.body.name,
// //             email: req.body.email,
// //             passwordHash: newPassword,
// //             phone: req.body.phone,
// //             isAdmin: req.body.isAdmin,
// //             street: req.body.street,
// //             apartment: req.body.apartment,
// //             zip: req.body.zip,
// //             city: req.body.city,
// //             country: req.body.country,
// //         },
// //         { new: true}
// //     )

// //     if(!user)
// //     return res.status(400).send('the user cannot be created!')

// //     res.send(user);
// // })

// // router.post('/login', async (req,res) => {
// //     const user = await User.findOne({email: req.body.email})
// //     const secret = process.env.secret;
// //     if(!user) {
// //         return res.status(400).send('The user not found');
// //     }

// //     if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
// //         const token = jwt.sign(
// //             {
// //                 userId: user.id,
// //                 isAdmin: user.isAdmin
// //             },
// //             secret,
// //             {expiresIn : '1d'}
// //         )

// //         res.status(200).send({user: user.email , token: token})
// //     } else {
// //        res.status(400).send('password is wrong!');
// //     }

// // })

// // router.post('/register', async (req,res)=>{
// //     let user = new User({
// //         name: req.body.name,
// //         email: req.body.email,
// //         passwordHash: bcrypt.hashSync(req.body.password, 10),
// //         phone: req.body.phone,
// //         isAdmin: req.body.isAdmin,
// //         street: req.body.street,
// //         apartment: req.body.apartment,
// //         zip: req.body.zip,
// //         city: req.body.city,
// //         country: req.body.country,
// //     })
// //     user = await user.save();

// //     if(!user)
// //     return res.status(400).send('the user cannot be created!')

// //     res.send(user);
// // })

// // router.delete('/:id', (req, res)=>{
// //     User.findByIdAndRemove(req.params.id).then(user =>{
// //         if(user) {
// //             return res.status(200).json({success: true, message: 'the user is deleted!'})
// //         } else {
// //             return res.status(404).json({success: false , message: "user not found!"})
// //         }
// //     }).catch(err=>{
// //        return res.status(500).json({success: false, error: err})
// //     })
// // })

// // router.get(`/get/count`, async (req, res) =>{
// //     const userCount = await User.countDocuments((count) => count)

// //     if(!userCount) {
// //         res.status(500).json({success: false})
// //     }
// //     res.send({
// //         userCount: userCount
// //     });
// // })

// module.exports =router;

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const User = require("../models/user");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(express.json)

//Get All Users
// http://localhost:3000/api/v1/users/
router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

//Register Users
// http://localhost:3000/api/v1/users/register
router.post("/register", async(req, res) => {
  //encrypt password
  let hashPassword = bcrypt.hashSync(req.body.password, 8);
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phone,
      role: req.body.role ? req.body.role : "User",
    },
    (err, data) => {
      if (err) return res.status(201).send("Error While Register");
      res.status(200).send("Registration Succesfull");
    }
  );
});

//login Users

router.post("/login", async(req, res) => {
  const email = req.body.data.email;
  const password = req.body.data.password;
  // console.log(req.body.data)
  // console.log(req.body.data.email)
  // console.log(req.body.data.password)

  User.findOne({ email: email }, (err, user) => {
    if (err) return res.status(201).send({ auth: false, token: "Error While Logging" });
    console.log(user);
    if (!user) return res.status(201).send({ auth: false, token: "No User Found" });
    else {
      const passIsValid = bcrypt.compareSync(password, user.password);
      if (!passIsValid)
        return res.status(201).send({ auth: false, token: "Invalid Password" });
      // in case both match
      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400,
      }); //24 hours
      res.status(200).send({ auth: true, token: token });
    }
  });
});

//userinfo
router.get("/userInfo", async(req, res) => {
  let token = req.headers["x-access-token"];
  if (!token) res.status(201).send({ auth: false, token: "No Token Provided" });
  //jwt verify
  jwt.verify(token, config.secret, (err, user) => {
    if (err) res.status(201).send({ auth: false, token: "Invalid Token" });
    User.findById(user.id, (err, result) => {
      res.status(200).send(result);
    });
  });
});

module.exports = router;
