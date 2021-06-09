const express = require('@feathersjs/express');
const router = express.Router();
const Exercice = require('../../models/exercice');


router.post('/', async (req, res) =>{
    try {
        const exercice = new Exercice(req.body);
        await exercice.save();
        res.json(exercice);
    console.log(exercice);
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
})

module.exports = router;