const server = require("./src/app")
const { conn } = require("./src/config/db")

conn.sync({ force: false }).then(() => {
  console.log("Database synced");
  const PORT = 8081;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
