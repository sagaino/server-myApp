const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailProduct,
} = require("./controller");

router.get("/product", getAllProduct);
router.get("/product/:id", getDetailProduct);
router.post("/product/create", auth, upload.single("image"), createProduct);
router.put("/product/edit/:id", auth, upload.single("image"), updateProduct);
router.delete("/product/delete/:id", auth, deleteProduct);

module.exports = router;
