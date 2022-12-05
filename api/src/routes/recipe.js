// Single-recipe requests will be performed here

const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const { types } = require('../controllers/controllerDiet')
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
        newRecipe.addDiet(dietDB);
        /* var aux = diets.pop();  // In case more than one diet was inserted, the last one will be used for validation
        var validate = types.includes(aux);  // validate will store true or false depending on if "aux" is included in the "types" over at '../controllers/controllerDiet'
        if(!validate) {  // if "aux" is not included in "types"
            const noDuplicate = Diet.findAll({
                where: {
                    name: aux
                }
            })
            if(!noDuplicate.length){  //
                const newDiet = await Diet.create({name: aux})
                newRecipe.addDiet(newDiet);
                types.push(aux);
            }     
        } */
        res.status(200).send(newRecipe);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
