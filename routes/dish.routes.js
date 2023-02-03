const { searchDish, updateDish } = require("../controllers/dish.controller")

const router = require("express").Router()

router.route("/search")
            .get(
                searchDish
            )

            
router.route("/update/:id")
                .post(
                    updateDish
                )


module.exports =router