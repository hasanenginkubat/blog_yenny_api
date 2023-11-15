const { Users } = require("../config/db");
const bcrypt = require("bcryptjs");
const image = '../images/defaultImage.png';

const createUser = async (email, password, fullName, photo) => {
  try {
    const existingUser = await Users.findOne({ where: { email } });

    if(existingUser){
    throw new Error("Ya existe ese mail")
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
    console.error(error);
    return { error: error.message };
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
    return { error: error.message };
  }
};

const logout = async (userId) => {
  try {
    const user = await Users.findOne({ where: { id: userId } });
    if (user) {
      return { logged: false, userId: user.id };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
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

module.exports = {
  getUsers,
  logout,
  login,
  updatePerfilForUser,
  updatePerfilForAdmin,
  updatePerfilFullName,
  updatePerfilPhoto,
  createUser,
};
