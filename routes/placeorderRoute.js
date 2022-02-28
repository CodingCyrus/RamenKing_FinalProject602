const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51KXgvyDYBllv1vKGYwQcZ40l92PGSPxLJvrKW2ccgQuUiGPFXEkn6xc43rO8nVf5n9T4tFmDE32T9Y5lymxSBXJj0005xwT5Jv")
const Order = require ("../models/orderModel")

router.post("/placeorder", async(req, res) => {

    //recieve four parameters from the front end
    const{token, pricetotal, currentUser, orderItems} = req.body

    try {
        //create customer object with user having unique email and tokenid as identifier
        const customer = await stripe.customers.create({
            email : token.email,
            source: token.id
        })
        //create payment object with unique key to avoid double payment on order
        const payment = await stripe.charges.create({
            amount:pricetotal*100,
            currency: 'usd',
            customer : customer.id,
            receipt_email : token.email
        }, {
            idempotencyKey : uuidv4()
        })

        //if payment succesful store order details data in mongoDB database
        //if payment succesful send success message if fail send fail message
        if(payment) {
            const neworder = new Order({
                name : currentUser.name,
                email : currentUser.email,
                userid : currentUser._id,
                orderItems : orderItems,
                orderAmount : pricetotal,
                shippingAddress : {
                    street : token.card.address_line1,
                    city : token.card.address_city,
                    country : token.card.address_country,
                    zipcode : token.card.address_zip
                },
                //store transactionId to verify if order was succesful via stripe
                transactionId : payment.source.id
            })
            neworder.save()
            res.send('Order Transaction SUCCESS')
        } else {
            res.send('Payment Failed')
        }
    } catch(error) {
        return res.status(400).json({ message: 'ERROR Something Went Wrong' + error});
    }
});

//get user orders data from orders data collection model
router.post("/getuserorders", async (req,res) => {
    const {userid} = req.body
    try{
        const orders = await Order.find({userid : userid}).sort({_id : -1})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: "Somethin Went Wrong"});
    }
});

//get all orders data from orders collection model
router.get("/getallorders", async (req,res) => {
    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: error});
    }
});

//delete order from orders collection model
router.post("/deleteorder", async (req, res) => {
    const orderid = req.body.orderid

    try {
        await Order.findOneAndDelete({_id : orderid})
        res.send('Order Deleted Succesfully')
    } catch (error) {
        return res.status(400).json({ message: error});
    }

});

//change delivery status of order in front end orderlist page of admin account
router.post("/deliverorder", async (req, res) => {
    const orderid = req.body.orderid
    try {
        const order = await Order.findOne({_id : orderid})
        order.isDelivered = true
        await order.save()
        res.send('Order Delivered Successfully')
    } catch (error) {
        return res.status(400).json({message: 'Something went wrong'});
    }
});

module.exports = router