const express = require("express");
const router = express.Router();
const Model = require('../models/LocationModel');
const Test = require("../models/ServerTest");



const keyGenerator = () => { return Math.ceil(Math.random() * 1000 + 1000); }

//route: 0 for server test
router.post('/servertest', async (req, res) => {
    try {
        console.log("someone is connected with your server!")
        let newUser = new Test({
            ip:req.body.ip
        })
        const saveUser = await newUser.save();
        res.send({success:"connected to server"});
        // console.log(saveUser);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// route: 1 for adding the location post request
router.post('/addlocation', async (req, res) => {
    try {

        let key = 0
        while (1) {
            key = keyGenerator();
            let exsits = await Model.findOne({ key });
            if (!exsits) {
                break;
            }
        }
        let newUser = new Model({
            key: key,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        })
        const saveUser = await newUser.save();
        res.send({ key: key });
        // console.log(saveUser);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// route: 2 for deleting the location delete request
router.delete('/deletelocation', async (req, res) => {
    try {

        const key = req.body.key
        const success = await Model.findOneAndDelete({ key })
        if (success)
            res.send({ success: "your location removed" });
        else {
            res.send({ error: "something went wrong" })
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// route: 3 for getting  the location get request
router.post('/getlocation/:key', async (req, res) => {
    try {

        const key = req.params.key
        const {longitude,latitude} = await Model.findOne({ key })
        
        res.json({longitude,latitude})
        
        // console.log("sending location")

    } catch (error) {
        console.log(error)
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// route:4  for updating the location put request
router.put('/updatelocation', async (req, res) => {
    try {

        let updatedLocation ={
            longitute: req.body.longitude,
            latitude: req.body.latitude
        }
        const key=req.body.key;
        const success = await Model.findOneAndUpdate({key},{ $set: updatedLocation }, { new: true });
        if(success){
            res.send({success:"updated"})
        }else{
            res.send({error:"something went wrong"})
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
