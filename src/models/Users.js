const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      photoGoogle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isFacebookUser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      facebookId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
      isBanner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isGoogleUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      logged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: false }
  );
};
