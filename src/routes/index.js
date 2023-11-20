const express = require("express");
const users = require("./usersRoutes")
const post = require("./postRouter")
const like = require("./likeRoutes")
const comment = require("./commentsRoutes")

const router = express.Router();

router.use(express.json());

router.use("/users", users);
router.use("/post", post);
router.use("/like", like);
router.use("/comment", comment);



module.exports = router;


