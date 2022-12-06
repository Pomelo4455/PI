// Single-recipe requests will be performed here

const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// POST /recipes:

router.post('/', async (req, res, next) => {
    const { name, summary, healthScore, steps, image, diets } = req.body;  // Grabbing all the info provided by "req.body" (passing through a controlled form) and assigning each property to a new const
    console.log(req.body);
    try {
        const newRecipe = await Recipe.create({  // newRecipe object (or class instance, same thing) is created once the promise is fulfilled assigning the previously initialized consts to each corresponding property
            name,
            summary,
            healthScore,
            steps,
            image,
        })
        let dietDB = await Diet.findAll({
            where: {
                name: diets,
            }
        })  // dietDB will be "diets", if "diets" exists in the DB, else 
        newRecipe.addDiet(dietDB);  //
        res.status(200).send(newRecipe);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
