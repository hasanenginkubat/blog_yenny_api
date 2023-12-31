const express = require('express');
const router = express.Router();
const {
  cancelSoftDelete,
  softDeleteUser,
  getUsers,
  logout,
  updatePerfilForUser,
  updatePerfilForAdmin,
  updatePerfilFullName,
  updatePerfilPhoto,
  createUser,
  login,
  createUserWithGoogle,
  createUserWithFacebook
  
} = require("../controllers/usersControllers")
const cloudinary = require("../utils/clodinary");
const upload = require("../middleware/multer");

const { transporter } = require("../controllers/sendMail");

router.post("/createuser",upload.fields([{ name: 'photo', maxCount: 10 }, { name: 'video', maxCount: 2 }]), async (req, res) => {
  try {

    let photoDataArray = [];
    
    if (req.files && req.files['photo']) {
      for (const photoFile of req.files['photo']) {
        const photoData = await cloudinary.uploader.upload(photoFile.path);
        photoDataArray.push(photoData);
      } 
    }

    let photo = photoDataArray.map(photoData => photoData.secure_url);

    const { email, password, fullName } = req.body;
    const newUser = await createUser(email, password, fullName, photo);

    if (newUser.error) {
      return res.status(500).json({ error: newUser.error });
    }

    let subject = "NUEVA CUENTA";
    let text = `Su cuenta ha sido creada sin problemas! ¡Felicidades!`;

    await transporter(email, subject, text);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/createuserGoogle", async (req, res) => {
  try {
    const { email, fullName, photoGoogle } = req.body;
    const newUser = await createUserWithGoogle(email, fullName, photoGoogle);

    if (newUser.error) {
      return res.status(500).json({ error: newUser.error });
    }

    let subject = "NUEVA CUENTA";
    let text = `Su cuenta ha sido creada sin problemas! ¡Felicidades!`;

    await transporter(email, subject, text);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/createuserFacebook", async (req, res) => {
  try {
    const { facebookId, fullName, photoGoogle } = req.body;
    const newUser = await createUserWithFacebook(facebookId, fullName, photoGoogle);

    if (newUser.error) {
      return res.status(500).json({ error: newUser.error });
    }

    let subject = "NUEVA CUENTA";
    let text = `Su cuenta ha sido creada sin problemas! ¡Felicidades!`;

    await transporter(email, subject, text);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put("/updatephoto/:id", upload.fields([{ name: 'photo', maxCount: 10 }, { name: 'video', maxCount: 2 }]), async (req, res) => {
  try {
    const { id } = req.params;
    let photoDataArray = [];
    
    if (req.files && req.files['photo']) {
      for (const photoFile of req.files['photo']) {
        const photoData = await cloudinary.uploader.upload(photoFile.path);
        photoDataArray.push(photoData);
      } 
    }

    let photo = photoDataArray.map(photoData => photoData.secure_url);

    const newPhoto = await updatePerfilPhoto(id, photo);

    if (newPhoto.error) {
      return res.status(500).json({ error: newPhoto.error });
    }

    res.status(201).json(newPhoto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.put("/updatename/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName } = req.body;

    const newName = await updatePerfilFullName(id, fullName);

    if (newName.error) {
      return res.status(500).json({ error: newName.error });
    }

    res.status(201).json(newName);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.put("/updateforadmin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const newAdmin = await updatePerfilForAdmin(id);

    if (newAdmin.error) {
      return res.status(500).json({ error: newAdmin.error });
    }

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.put("/updateforuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const newAdmin = await updatePerfilForUser(id);

    if (newAdmin.error) {
      return res.status(500).json({ error: newAdmin.error });
    }

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.put("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const ban = await softDeleteUser(id);

    if (ban.error) {
      return res.status(500).json({ error: ban.error });
    }

    res.status(201).json(ban);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put("/cancelDeleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const ban = await cancelSoftDelete(id);

    if (ban.error) {
      return res.status(500).json({ error: ban.error });
    }

    res.status(201).json(ban);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post("/login", async (req, res) => {
try {
const { email, password } = req.body;
const user = await login(email, password);
if(user.error){
  return res.status(500).json({ error: user.error });
}
res.status(201).json(user)
}
catch (error) {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}
})

router.post("/logout/:id", async (req, res) => {
try {
const { id } = req.params;

const user = await logout(id);

if(user.error){
  return res.status(500).json({ error: user.error });

}
res.status(201).json(user)

}
catch (error) {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}

})

router.get("/", async (req, res) => {
try {
const allUsers = await getUsers();

res.status(201).json(allUsers)

}
catch (error) {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}

})

module.exports = router;
