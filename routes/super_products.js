const { superProduct } = require("../models/super_products");
const express = require("express");
const { find } = require("../models/user");
const router = express.Router();

router.post(`/`, async(req,res) => {
    let SuperProduct = new superProduct({
      superProduct_name: req.body.superProduct_name,
      category_name: req.body.category_name
    });
    const result = await SuperProduct.save();
    console.log(result)
    res.send(result);
})

//get all super_products within a specific category
router.get(`/searchByCategory`,async(req,res) =>{
    const req_category_name = req.query.category_name
    console.log(req_category_name)
    const superProductsList = await superProduct.find({
      category_name: req_category_name,
    });
    console.log(superProductsList)
    res.send(superProductsList)
})

module.exports = router;