const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
 
    sequelize.define(
        "comments",
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
        totalLike: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        userIdCommentsLike: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
      }, 
        date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
          },
        },
        { timestamps: false }

        )

}