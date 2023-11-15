const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "like",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    },
    { timestamps: false }
  );

};
