const { Posts } = require("../config/db");

const addLike = async (id, userId) => {
  try {
    const post = await Posts.findOne({ where: { id } });

    if (!post) {
      throw new Error("¡No existe tal publicación!");
    }

    if (!post.userIdLikes) {
      post.userIdLikes = [];
    }
    if (post.userIdLikes && Array.isArray(post.userIdLikes) && !post.userIdLikes.includes(userId)) {
      post.totalLike += 1;
      post.userIdLikes = post.userIdLikes.concat(userId)
      await post.save();
    }
    return post;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error");
  }
};

const removeLike = async (id, userId) => {
  try {
    const post = await Posts.findOne({ where: { id } });

    if (!post) {
      throw new Error("¡No existe tal publicación!");
    }

    if (post.userIdLikes && Array.isArray(post.userIdLikes) && post.userIdLikes.includes(userId)) {
      post.totalLike -= 1;
      post.userIdLikes = post.userIdLikes.filter(likedUserId => likedUserId !== userId);
      await post.save();
    }

    return post;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error");
  }
};



module.exports = {
  addLike,
  removeLike
};
