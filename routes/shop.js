const {Shop} = require('../models/shop')
const express = require('express')
const router = express.Router()
const { storage } = require("../storage/storage")
const multer = require("multer");
const upload = multer({ storage });


router.post(`/`,upload.single("file"), async(req,res) => {
    const file = req.file;
    let shop = new Shop({
      shop_name: req.body.shop_name,
      shop_description: req.body.shop_description,
      shop_address: req.body.shop_address,
      shop_owner_name: req.body.shop_owner_name,
      shop_image: file.path,
      shop_latitude: req.body.shop_latitude,
      shop_longitude: req.body.shop_longitude,
    });
    result = await shop.save()
    res.status(201).send(result)
})


router.get('/',async(req,res) => {
    id = req.query.id
    let shop = await Shop.findById({_id:id})
    res.send(shop)
})

router.patch('/', async(req,res) => {
    _id =  req.body._id
    console.log(_id)
    let update = await Shop.findByIdAndUpdate(_id, req.body)
    res.send(update)
})

router.delete('/',async(req,res) => {
    _id = req.body._id
    let del = await Shop.findByIdAndDelete({_id:_id})
    res.send(del)
})
module.exports = router