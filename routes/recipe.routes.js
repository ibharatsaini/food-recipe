const { createRecipe, getRecipe, editRecipe, updateRecipe, allRecipe, userRecipes } = require("../controllers/recipe.controller")
const { createUser, loginUser } = require("../controllers/user.controller")
const authenticateUser = require("../middlewares/authenticateUser")

const router = require("express").Router()


router.route("/create")
            .post(
                [
                    authenticateUser
                ],
                createRecipe
            )

            
router.route("/all")
            .get(
                allRecipe
            )


router.route("/:id")
                .get(
                    getRecipe
                )

router.route("/edit/:id")
                .get(
                    [
                        authenticateUser
                    ],
                    editRecipe
                )

router.route("/update/:id")
                .post(
                    [
                        authenticateUser
                    ],
                    updateRecipe
                )

router.route("/my-recipes")
                    .get(
                        [
                            authenticateUser
                        ],
                        userRecipes
                    )




module.exports = router