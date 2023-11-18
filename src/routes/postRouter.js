const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/clodinary");
const upload = require("../middleware/multer");
const { createPost, updatePost, postDelete, getPosts } = require('../controllers/postControllers');
const { transporter } = require("../controllers/sendMail")
const { fetchEmails } = require("../controllers/usersControllers")


router.post('/createPost', upload.fields([{ name: 'photo', maxCount: 10 }, { name: 'video', maxCount: 2 }]), async (req, res) => {
  try {
    let photoDataArray = [];
    
    if (req.files && req.files['photo']) {
      for (const photoFile of req.files['photo']) {
        const photoData = await cloudinary.uploader.upload(photoFile.path);
        photoDataArray.push(photoData);
      } 
    }

    let uploadOptions = {};
    if (req.files && req.files['video'] && req.files['video'][0].mimetype.includes("video")) {
      uploadOptions = { resource_type: "video" };
    }

    let videoDataArray = [];
    if (req.files && req.files['video']) {
      for (const videoFile of req.files['video']) {
        const videoData = await cloudinary.uploader.upload(videoFile.path, uploadOptions);
        videoDataArray.push(videoData);
      }  
    }

    let video = videoDataArray.map(videoData => videoData.secure_url);
    let photo = photoDataArray.map(photoData => photoData.secure_url);
    let { description } = req.body;

    if (!photo || photo.length === 0) {
      photo = null;
    }

    if (!video || video.length === 0) {
      video = null;
    }
  
    let emailResult = await fetchEmails();

    if (emailResult.error) {
      console.error("Error getting user emails:", emailResult.error);
      return res.status(500).json({ error: emailResult.error });
    }
    
    let email = emailResult;
    
    let subject = "Nuevo post de Blog Yenny";

    let text = description || '';
    
    await transporter(email, subject, text, photo, video);
    
    const newPost = await createPost(description, video, photo);

    if (newPost.error) {
      return res.status(500).json({ error: newPost.error });
    }
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/updatePost/:id', upload.fields([{ name: 'photo', maxCount: 10 }, { name: 'video', maxCount: 2 }]), async (req, res) => {
  try {

    const { id } = req.params
    let photoDataArray = [];
    
    if (req.files && req.files['photo']) {
      for (const photoFile of req.files['photo']) {
        const photoData = await cloudinary.uploader.upload(photoFile.path);
        photoDataArray.push(photoData);
      } 
    }

    let uploadOptions = {};
    if (req.files && req.files['video'] && req.files['video'][0].mimetype.includes("video")) {
      uploadOptions = { resource_type: "video" };
    }

    let videoDataArray = [];
    if (req.files && req.files['video']) {
      for (const videoFile of req.files['video']) {
        const videoData = await cloudinary.uploader.upload(videoFile.path, uploadOptions);
        videoDataArray.push(videoData);
      }  
    }

    let video = videoDataArray.map(videoData => videoData.secure_url);
    let photo = photoDataArray.map(photoData => photoData.secure_url);
    let { description } = req.body;

    if (!photo || photo.length === 0) {
      photo = null;
    }

    if (!video || video.length === 0) {
      video = null;
    }
  
    
    const newPost = await updatePost(id, description, video, photo);

    if (newPost.error) {
      return res.status(500).json({ error: newPost.error });
    }
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete("/postDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const uuidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i;
    
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const post = await postDelete(id);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No existe ningun publicacion :(' });
  }
});



router.get("/", async (req,res) => {
  try {
  
  const post = await getPosts();
  res.status(201).json(post);
  
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  })




module.exports = router;
