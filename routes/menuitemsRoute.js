const express = require("express");
const router = express.Router();
const Item = require('../models/menuitemModel')

router.get("/getallitems", async(req,res) => {

    try{
        const items = await Item.find({})
        res.send(items)
    } catch(error) {
        return res.status(400).json({ message: error});
    }

});

router.post("/additem", async(req,res) => {

    const item = req.body.item

    try {
        const newitem = new Item ({
            item : item.item,
            imageURL : item.imageURL,
            sizes : ['S','M','L'],
            description : item.description,
            category : item.category,
            prices : [item.prices]
        })
        await newitem.save()
        res.send('New Item Added Succesfully')
    } catch (error) {
        return res.status(400).json({ message : error})
    }

}); 

router.post("/getitembyid", async (req, res) => {

    const itemid = req.body.itemid

    try {
        const item = await Item.findOne({_id : itemid})
        res.send(item)
    } catch(error) {
        return res.status(400).json({ message: error})
    }
});

router.post("/edititem", async (req,res) => {
    const editeditem = req.body.editeditem
    
    try {
        const item = await Item.findOne({_id : editeditem._id})

        item.item = editeditem.item,
        item.description = editeditem.description,
        item.imageURL= editeditem.imageURL,
        item.category = editeditem.category,
        item.prices = [editeditem.prices]

        await item.save()

        res.send('Item Details Edited Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/deleteitem", async (req, res) => {
    const itemid = req.body.itemid

    try {
        await Item.findOneAndDelete({_id : itemid})
        res.send('Item Deleted Succesfully')
    } catch (error) {
        return res.status(400).json({ message: error});
    }

});

module.exports = router;