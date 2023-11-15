const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {

  sequelize.define(
    "media",
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
    )
}