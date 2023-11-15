require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    native: false,
});


const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Comments, Like, Media, Posts, Users } = sequelize.models;

Posts.hasMany(Comments, { foreignKey: "postId" });
Comments.belongsTo(Posts, { foreignKey: "postId" });
Posts.hasMany(Like, { foreignKey: "postId" });
Like.belongsTo(Posts, { foreignKey: "postId" });
Posts.hasMany(Media, { foreignKey: "postId" });
Media.belongsTo(Posts, { foreignKey: "postId" });
Comments.belongsTo(Users, { foreignKey: "userId" });
Like.belongsTo(Users, { foreignKey: "userId" });



module.exports = {
  ...sequelize.models,
  conn: sequelize,
};