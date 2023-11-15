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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isBanner: {
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
