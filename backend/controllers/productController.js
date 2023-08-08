const product = require('../models/productModel')


const getproducts = async (req,res)=>{
    product.find({})
    .then(products=>{
        res.status(200).json(products)
    })
    .catch(err=>{
        res.status(404).json({error: err.message})
        console.log(err)
    })
}

const postproduct = async (req,res)=>{
    const postproduct = req.body
    console.log(req.body)
    
    product.create(postproduct)
    .then(result=>{
        if(result){
            res.status(200).json({msg:"Product Added"})
        }
        else{
            res.status(400).json({msg:"Incorrect request"})
        }
    })
    .catch(err=>{
        console.log("error: ", err.message);
        res.status(500).json({msg:"Error in Uploading to Database"})
        console.log(err)
    })
    
}

const deleteproduct = async(req,res)=>{
    const id = req.params.id
    product.deleteOne({id:id})
    .then(result=>{
        res.status(200).send(result)
        console.log(result)
    })
    .catch(err=>{
        res.status(500).send(err)
        console.log(err)
    })
}


module.exports = {getproducts,postproduct,deleteproduct}