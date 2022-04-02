const { Product } = require("../../db/models");
const { Op } = require("sequelize");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  getAllProduct: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;
      let condition;
      if (keyword !== "") {
        condition = { name: { [Op.like]: `%${keyword}%` } };
      }

      const product = await Product.findAll({
        where: condition,
      });
      res.status(200).json({
        message: "success get data product",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(403).json({
          message: "no file uploaded",
        });
      }
      const { name, price, stock } = req.body;
      const image = `/upload/${req.file.filename}`;
      const product = await Product.create({
        name,
        price,
        stock,
        image,
      });

      res.status(201).json({
        message: "success create product",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      if (!req.file) {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const checkProduct = await Product.findOne({
          where: {
            id: id,
          },
        });
        if (!checkProduct) {
          res.status(404).json({
            message: "Id product not found",
          });
        }

        const product = await checkProduct.update({
          name,
          price,
          stock,
        });

        res.status(200).json({
          message: "edit product success",
          data: product,
        });
      } else {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const image = `/upload/${req.file.filename}`;

        const checkProduct = await Product.findOne({
          where: {
            id: id,
          },
        });
        if (!checkProduct) {
          res.status(404).json({
            message: "Id product not found",
          });
        }
        await fs.unlink(path.join(`public/${checkProduct.image}`));

        const product = await checkProduct.update({
          name,
          price,
          stock,
          image,
        });

        res.status(200).json({
          message: "edit product success",
          data: product,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkProduct = await Product.findOne({
        where: {
          id: id,
        },
      });
      if (checkProduct) {
        await fs.unlink(path.join(`public/${checkProduct.image}`));
        const product = await checkProduct.destroy();
        res.status(200).json({
          message: "success delete product",
          data: product,
        });
      } else {
        res.status(404).json({
          message: "Id product not found",
        });
      }
    } catch (err) {
      next(err);
    }
  },
};
