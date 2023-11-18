const express = require('express');
const router = express.Router();
const { addLike } = require("../controllers/likeControllers")



router.put("/addlike", async (req, res) => {
try {

const { userId, postId } = req.body;

const like = await addLike(postId, userId);

return res.status(201).json(like);

}
catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

})


module.exports = router;
