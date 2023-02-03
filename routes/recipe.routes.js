const { createRecipe, getRecipe, editRecipe, updateRecipe, allRecipe } = require("../controllers/recipe.controller")
const { createUser, loginUser } = require("../controllers/user.controller")

const router = require("express").Router()


router.route("/create")
            .post(
                
                createRecipe
            )
router.route("/all")
            .get(
                allRecipe
            )
router.route("/:id")
                .get(getRecipe)

router.route("/edit/:id")
                .get(
                    editRecipe
                )

router.route("/update/:id")
                .post(
                    updateRecipe
                )
router.route("/login")
                .get(loginUser)



module.exports = router