const { Users } = require("../config/db");
const bcrypt = require("bcryptjs");
const image = '../images/defaultImage.png';

const createUser = async (email, password, fullName, photo) => {
  try {
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("Esta dirección de correo electrónico ya está registrada.");
    }

    let hashedPassword = null;
    if (!existingUser || !existingUser.isGoogleUser) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const name = fullName
      .split(" ")
      .map((name) => name[0].toUpperCase() + name.substring(1))
      .join(" ");

    const User = await Users.create({
      password: hashedPassword,
      fullName: name,
      photo: photo || image,
      email: email,
    });

    return User;
  } catch (error) {
    let errorMessage = "Hubo un error, por favor intenta nuevamente más tarde.";

    if (error.message.includes("Esta dirección de correo electrónico ya está registrada.")) {
      errorMessage = "Esta dirección de correo electrónico ya está en uso.";
    } else if (error.message.includes("validation error")) {
      errorMessage = "Asegúrese de completar el formulario correctamente.";
    }

    return { error: errorMessage };
  }
};


const createUserWithGoogle = async (email, fullName, photoGoogle) => {
  try {
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("Este correo electrónico ya está registrado.");
    }

    const User = await Users.create({
      fullName: fullName,
      photoGoogle: photoGoogle || image,
      email: email,
      isGoogleUser: true,
    });

    return User;
  } catch (error) {
    console.error(error);

    let errorMessage = "Se produjo un error. Por favor, inténtelo de nuevo.";

    if (error.message.includes("Este correo electrónico ya está registrado.")) {
      errorMessage = "Este correo electrónico ya está en uso.";
    }

    return { error: errorMessage };
  }
};

const createUserWithFacebook = async (facebookId, fullName, photoGoogle) => {
  try {
    const existingUser = await Users.findOne({ where: { facebookId } });

    if (existingUser) {
      throw new Error("Ya existe ese account de Facebook");
    }
    const user = await Users.create({
      fullName: fullName,
      photoGoogle: photoGoogle || image,
      facebookId: facebookId,
      isFacebookUser: true,
    });

    return user;
  } catch (error) {
    console.error(error);

    let errorMessage = "Se produjo un error. Por favor, inténtelo de nuevo.";

    if (error.message.includes("Este correo electrónico ya está registrado.")) {
      errorMessage = "Este correo electrónico ya está en uso.";
    }

    return { error: errorMessage };
  }
};


const updatePerfilPhoto = async (id, photo) => {
  try {
    const newUser = await Users.update(
      { photo: photo },
      { where: { id } }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const updatePerfilFullName = async (id, fullName) => {
  try {
    const name = fullName.trim().toLowerCase() + fullName.substring(1);

    const newUser = await Users.update(
      { fullName: name },
      { where: { id } }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const updatePerfilForAdmin = async (id) => {
  try {
    const newUser = await Users.update(
      { isAdmin: true },
      { where: { id } }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const updatePerfilForUser = async (id) => {
  try {
    const newUser = await Users.update(
      { isAdmin: false },
      { where: { id } }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const login = async (email, password) => {
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (user.isBanner) {
      throw new Error("Comuníquese con el administrador, su cuenta ha sido restringida.");
    }

    if (user.isGoogleUser) {
      return { logged: true, userId: user.id, photo: user.photo, fullName: user.fullName };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Contraseña no válida");
    }

    return { logged: true, userId: user.id, photo: user.photo, fullName: user.fullName };
  } catch (error) {
    console.error(error);

    let errorMessage = "Se produjo un error. Por favor, inténtelo de nuevo.";

    if (error.message === "Usuario no encontrado") {
      errorMessage = "Usuario no encontrado. Verifique su correo electrónico.";
    } else if (error.message === "Comuníquese con el administrador, su cuenta ha sido restringida.") {
      errorMessage = "Comuníquese con el administrador, su cuenta ha sido restringida.";
    } else if (error.message === "Contraseña no válida") {
      errorMessage = "Contraseña no válida. Verifique su contraseña e inténtelo de nuevo.";
    }

    return { error: errorMessage };
  }
};

const logout = async (userId) => {
  try {
    const user = await Users.findOne({ where: { id: userId } });

    if (user) {
      return { logged: false, userId: user.id };
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);

    let errorMessage = "Se produjo un error. Por favor, inténtelo de nuevo.";

    if (error.message === "Usuario no encontrado") {
      errorMessage = "Usuario no encontrado. Verifique su sesión e inténtelo de nuevo.";
    }

    return { error: errorMessage };
  }
};


const getUsers = async () => {
  try {
    let users = await Users.findAll();
    return users;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};



const softDeleteUser = async (userId) => {
  try {
    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      return { isBanner: false, error: "Usuario no encontrado" };
    }
    return { isBanner: true, userId: user.id };
  } catch (error) {
    console.error(error);
    return { isBanner: false, error: error.message };
  }
};



const cancelSoftDelete = async (userId) => {
  try {
    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      return { error: "Usuario no encontrado" };
    }
    return { isBanner: false, userId: user.id };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};


const fetchEmails = async () => {
  try {
    let users = await Users.findAll();
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    let emails = users.map(user => user.email).filter(Boolean);

    if (emails.length === 0) {
      throw new Error("No valid email addresses found");
    }

    return emails;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};






module.exports = {
  getUsers,
  logout,
  login,
  updatePerfilForUser,
  updatePerfilForAdmin,
  updatePerfilFullName,
  updatePerfilPhoto,
  createUser,
  cancelSoftDelete,
  softDeleteUser,
  fetchEmails,
  createUserWithGoogle,
  createUserWithFacebook
};
