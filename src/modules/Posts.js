const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
 
    sequelize.define(
        "posts",

        {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true   
        },
        description: {
        type: DataTypes.TEXT,
        allowNull: true,
        },   
        date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
          }
        },
        { timestamps: false }

        )

}