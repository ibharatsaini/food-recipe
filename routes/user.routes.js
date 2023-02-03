const { createUser, loginUser } = require("../controllers/user.controller")

const router = require("express").Router()


router.route("/create")
                .post(
                    createUser
                )

router.route("/login")
                .post(
                    loginUser
                )


module.exports = router