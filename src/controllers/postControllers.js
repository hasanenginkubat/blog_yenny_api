const { Posts } = require("../config/db");


const createPost = async (description, video, photo) => {
  try {
    const post = await Posts.create({
      description: description,
      photo: [photo],
      video: [video]
    });
    return post;
  } catch (error) {
    console.error(error);
    throw new Error("Se produjo un error al crear la publicación.");
  }
};

const updatePost = async (postId, description, video, photo) => {

try {

  const post = await Posts.findByPk(postId);
  if(!post){
  throw new Error("El post no se encontrado")
  }

if(description){
  post.description = description;
}

if(video){
  post.video = [video];
}

if(photo){
  post.photo = [photo];
}

await post.save();
return post;

}
catch (error) {
  console.error(error);
  throw new Error("Se produjo un error al crear la publicación.");
}
}

const getPosts = async () => {
  try {
    const posts = await Posts.findAll();

    if (!posts || posts.length === 0) {
      throw new Error("No hay ningún post :(");
    }

    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Se produjo un error al encontrar la publicación.");
  }
};

const postDelete = async (id) => {
  try {
    const post = await Posts.findOne({
      where: {
        id: id
      }
    });
    
    if (post) {
      await post.destroy();
      return id;
    } else {
      throw new Error("post no encontrado");
    }
  } catch (error) {
   
    return { error: error.message };
  }
};



module.exports = {
  createPost,
  updatePost,
  getPosts,
  postDelete
};
