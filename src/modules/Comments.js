const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
 sequelize.define(
    "comments",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
          }
    },
    { timestamps: false }
  );

};
