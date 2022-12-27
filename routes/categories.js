const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

// http://localhost:3000/api/v1/categories
router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
})

// http://localhost:3000/api/v1/categories/635b8ce94fa6d861d3e2c827
router.get('/:id', async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
})


// http://localhost:3000/api/categories
router.post('/', async (req,res)=>{
    let category = new Category({
      category_name: req.body.category_name,
    });
    const result = await category.save();

    if(!result)
    return res.status(400).send('the category cannot be created!')

    res.send(result);
})

// http://localhost:3000/api/v1/categories/635b8ce94fa6d861d3e2c827
router.put('/:id',async (req, res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon ,
            color: req.body.color,
        },
        { new: true}
    )

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})



// http://localhost:3000/api/v1/categories/635b88a34062ba8f11f66fe4
router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;

