const server = require("./src/app")
const { conn } = require("./src/config/db")

conn.sync({ force: true }.then(() => {
 server.listen(8081, () => {
  console.log("%s listening at 8081")

  })

}))