const express = require("express");
const users = require("./usersRoutes")

const router = express.Router();

router.use(express.json());

router.use("/users", users);


module.exports = router;


