const { Comments, Posts } = require("../config/db");

const addComments = async (postId, userId, description) => {
  try {
    const post = await Posts.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error("¡No existe tal publicación!");
    }
    const comments = await Comments.create({
    postId: postId,
    userId: userId,
    description
    })
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error");
  }
};

const commentDelete = async (id) => {
    try {
      const comment = await Posts.findOne({
        where: {
          id: id
        }
      });
      
      if (comment) {
        await comment.destroy();
        return { message: "Comment eliminado" };
      } else {
        throw new Error("Comment no encontrado");
      }
    } catch (error) {
     
      return { error: error.message };
    }
  };


  const addCommentsForComment = async (postId, userId, description, commentId) => {
    try {
      const post = await Comments.findOne({ where: { id: commentId } });
      if (!post) {
        throw new Error("¡No existe tal comments!");
      }
      const comments = await Comments.create({
      commentIdc: commentId,
      postId: postId,
      userId: userId,
      description
      })
      return comments;
    } catch (error) {
      console.error(error);
      throw new Error("Ocurrió un error");
    }
  };


  const addLike = async (id, userId) => {
    try {
      const comment = await Comments.findOne({ where: { id } });
  
      if (!comment) {
        throw new Error("¡No existe tal comment!");
      }
  
      if (!comment.userIdCommentsLike) { 
        comment.userIdCommentsLike = [];
      }
      if (comment.userIdCommentsLike && Array.isArray(comment.userIdCommentsLike) && !comment.userIdCommentsLike.includes(userId)) {
        comment.totalLike += 1;
        comment.userIdCommentsLike = comment.userIdCommentsLike.concat(userId); 
        await comment.save();
      }
      
      return comment;
    } catch (error) {
      console.error(error);
      throw new Error("Ocurrió un error");
    }
  };
  
  const removeLike = async (id, userId) => {
    try {
      const comment = await Comments.findOne({ where: { id } });
  
      if (!comment) {
        throw new Error("¡No existe tal publicación!");
      }
  
      if (comment.userIdCommentsLike && Array.isArray(comment.userIdCommentsLike) && comment.userIdCommentsLike.includes(userId)) {
        comment.totalLike -= 1;
        comment.userIdCommentsLike = comment.userIdCommentsLike.filter(likedUserId => likedUserId !== userId);
        await comment.save();
      }
  
      return comment;
    } catch (error) {
      console.error(error);
      throw new Error("Ocurrió un error");
    }
  };
  

  



module.exports = {
  addComments,
  commentDelete,
  addCommentsForComment,
  removeLike,
  addLike

};
