const express = require('express');
const router = express.Router();
const {
  getUsers,
  logout,
  updatePerfilForUser,
  updatePerfilForAdmin,
  updatePerfilFullName,
  updatePerfilPhoto,
  createUser,
  login,
} = require("../controllers/usersControllers")

const { transporter } = require("../controllers/sendMail");

router.post("/createuser", async (req, res) => {
  try {
    const { email, password, fullName, photo } = req.body;
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


router.put("/updatephoto/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { photo } = req.body;

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

module.exports = router;
