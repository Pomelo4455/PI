// Multiple-diets requests will be performed here

const { Router } = require("express");
const { Diet } = require("../db");
const { types } = require("../controllers/controllerDiet")
const router = Router();

// GET /types:

router.get('/', async(req, res, next) => {
    try {
        types.forEach(async n => {
           await Diet.findOrCreate({
                where: {
                    name: n
                }
            })
        });
        const diets = await Diet.findAll();
        res.send(diets);
    } catch (err) {
        next(err);
    }
})

module.exports = router;
