const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();
const { storage } = require("../storage/storage");
const multer = require("multer");
const upload = multer({ storage });

// http://localhost:5000/api/products?id=635b941e32979097cf3d5e42
router.get(`/id`, async (req, res) =>{
    const product = await Product.findById(req.query.id);

    if(!product) {
        res.status(500).json({success: false})
    } 
    else{
      res.send(product);
    }
})

// get all releated products from super products
router.get(`/`, async(req,res) => {
  const req_superProduct_name = req.query.superProduct_name

  const productList = await Product.find({
    superProduct_name: req_superProduct_name,
  });

  res.send(productList)
})



//http://localhost:5000/api/v1/products/
router.post(`/`, upload.single("file"), async (req, res) => {
  const file = req.file;
  let product = new Product({
    superProduct_name: req.body.superProduct_name,
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_image: file.path,
    product_price: req.body.product_price,
    product_stock: req.body.product_stock,
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});


// http://localhost:5000/api/products/data
router.patch("/data", async (req, res) => {
  _id = req.body._id
  console.log(_id)
  let update = await Product.findByIdAndUpdate(_id, req.body);
  console.log(update)
  if (!update) return res.status(500).send("the product cannot be updated!");

  res.send(update);
});

// http://localhost:5000/api/products/image
router.patch("/image", upload.single("file"), async (req, res) => {
  _id = req.body._id
  console.log(_id)
  const file = req.file;
  let update = await Product.findByIdAndUpdate(_id, {product_image: file.path});

  if (!update) return res.status(500).send("the product cannot be updated!");

  res.send(update);
});



// http://localhost:3000/api/products/
router.delete('/', (req, res)=>{
    Product.findByIdAndRemove(req.query._id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})



module.exports =router;