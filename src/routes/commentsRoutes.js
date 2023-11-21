const express = require('express');
const router = express.Router();
const { addComments, addCommentsForComment, addLike, removeLike, getCommentsForPost, getCommentsForComment } = require("../controllers/commentsControllers")

router.post("/addcomment", async (req, res) => {
  try {
    const { userId, postId, description } = req.body;
    const comment = await addComments(postId, userId, description);
    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/addcommentforcomment", async (req, res) => {
    try {
      const { userId, postId, description, commentIdc } = req.body;
      const comment = await addCommentsForComment(postId, userId, description, commentIdc);
      return res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.put("/addlike", async (req, res) => {
    try {
      const { userId, commentId } = req.body;
      const like = await addLike(commentId, userId);
      return res.status(201).json(like);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  router.put("/removeLike", async (req, res) => {
    try {
      const { userId, commentId } = req.body;
      const like = await removeLike(userId, commentId);
      return res.status(201).json(like);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  router.get("/", async (req, res) => {
    try {
      const { postId } = req.body;
      const comments = await getCommentsForPost(postId);
      
      res.status(201).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get("/commentId", async (req, res) => {
    try {
      const { commentId } = req.body;
      const comments = await   getCommentsForComment(commentId);
      
      res.status(201).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });








module.exports = router;
