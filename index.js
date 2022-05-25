const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/user");
const router = require('./router');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', router);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, function () {
      console.log("server is running...");
    });
  })
  .catch((err) => console.log(err));
