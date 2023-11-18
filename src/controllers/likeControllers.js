const { Posts } = require("../config/db");

const addLike = async (postId, userId) => {
  try {
    const post = await Posts.findByPk(postId);

    if (!post) {
      throw new Error("No existe ese post!");
    }

    if (post.likesUsers !== userId) {
      post.like.push(userId);
      console.log("adsad")

      post.totalLike += 1;
      await post.save();
    }
    return post;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrio un error");
  }
};

module.exports = {
    addLike,
};
