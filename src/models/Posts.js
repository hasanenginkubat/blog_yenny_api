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
          },
          video: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
          },
          photo: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
          },
        totalLike: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: true,
      },
      userIdLikes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            userId: {
                type: DataTypes.UUID,
                allowNull: true,
            }
        }
        },
        { timestamps: false }

        )

}