const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(403).json({ message: "Silahkan isi email dan password" });
      }
      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
              },
            },
            "secret"
          );
          res.status(200).json({ message: "sukses signin", data: token });
        } else {
          res.status(403).json({ message: "Invalid password" });
        }
      } else {
        res.status(403).json({ message: "Invalid email" });
      }
    } catch (err) {
      next(err);
    }
  },

  singup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      if (validator.isEmail(email)) {
        if (password.length < 5) {
          res.status(403).json({ message: "Password must >5" });
        } else {
          if (password !== confirmPassword) {
            res
              .status(403)
              .json({ message: "Password and confirm password dont match" });
          } else {
            const checkEmail = await User.findOne({ where: { email: email } });
            if (checkEmail) {
              return res.status(403).json({ message: "email sudah ada" });
            } else {
              const user = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                role: "admin",
              });
              delete user.dataValues.password;
              res.status(201).json({
                message: "sukses signup",
                data: user,
              });
            }
          }
        }
      } else {
        res.status(403).json({ message: "Format Email salah" });
      }
    } catch (err) {
      next(err);
    }
  },
};
