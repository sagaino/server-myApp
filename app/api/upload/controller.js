const fs = require("fs-extra");
const path = require("path");

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(403).json({
        message: "no file uploaded",
      });
    }
    // await fs.unlink(path.join(`public/${product.image}`));

    res.status(201).json({
      message: "success upload image",
      data: { src: `/upload/${req.file.filename}` },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadImage };
