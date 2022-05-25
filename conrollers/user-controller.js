const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { accessKey } = require("../config");
const fs = require("fs");
const multer = require("multer");
const storageConfig = require("../config/storageConfig.js");

class UserController {
  async registration(req, res) {
    const { author, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 3);
    const user = await User.findOne({ where: { author } });
    if (!user) {
      User.create({
        author,
        password: hashedPassword,
      })
        .then(() => {
          res.send("User created");
        })
        .catch((e) => console.log(e));
    } else {
      res.status(400);
      res.send("That user already exist");
    }
  }
  async authorization(req, res) {
    const { author, password } = req.body;
    const user = await User.findOne({ where: { author } });
    if (!user) {
      return res.send("author is not found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      return res.send("Incorrect password");
    }
    const jwtToken = jwt.sign({ author }, accessKey, { expiresIn: 3600 * 24 });
    return res.json({ jwtToken });
  }
  async editMessage(req, res) {
    const { author } = req.userData;
    const { message } = req.body;
    try {
      await User.update({ message }, { where: { author } });
      return res.send("message updated");
    } catch (e) {
      console.log(e);
      return res.status(400).json("edition error");
    }
  }
  addMediaFile(req, res) {
    const upload = multer({ storage: storageConfig }).single("filedata");
    upload(req, res, async (err) => {
     const mediaFileLink = req.file.filename;
      if (!err) {
        await User.update(
          { mediaFileLink: "/media/" + mediaFileLink },
          { where: { author } }
        );
        return res.send("file uploded");
      } else {
        console.log(err);
        return res.status(400).json("edition error");
      }
    });
    const { author } = req.userData;
  }
  async getPosts(req, res) {
    try {
      const users = await User.findAll({ raw: true });
      const usersToSend = users.map(
        (u) =>
          (u = {
            author: u.author,
            message: u.message,
            date: u.createdAt,
            mediaFileLink: u.mediaFileLink,
          })
      );
      res.send(usersToSend);
    } catch {
      res.status(400).send();
    }
  }
  async deletePost(req, res) {
    const { author } = req.userData;
    try {
      await User.destroy({ where: { author } });
      return res.send("post deleted");
    } catch (e) {
      console.log(e);
      return res.status(400).json("deletion error");
    }
  }
  async getFile(req, res) {
    fs.readFile("uploads/" + req.params.file, function (error, data) {
      if (error) {
        res.status(404);
        res.send("file not found!");
      } else {
        res.end(data);
      }
    });
  }
}

module.exports = new UserController();
