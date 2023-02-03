const { searchDish, updateDish } = require("../controllers/dish.controller")
const authenticateUser = require("../middlewares/authenticateUser")

const router = require("express").Router()

router.route("/search")
            .get(
                searchDish
            )

            
router.route("/update/:id")
                .post(
                    [
                        authenticateUser
                    ],
                    updateDish
                )


module.exports =router