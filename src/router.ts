import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import { error } from "console";
const router = Router();

/* 
Product
*/
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/* 
Update
*/
router.get("/update", getUpdates, () => {});
router.get("/update/:id", getOneUpdate, () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("verson").optional(),
  updateUpdate,
  () => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate,
  () => {}
);
router.delete("/update/:id", deleteUpdate, () => {});

/* 
Updatepoints
*/
router.get("/updatepoints", () => {});
router.get("/updatepoints/:id", () => {});
router.put(
  "/updatepoints/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoints",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoints/:id", () => {});

router.use((error, req, res, next) => {
  if (error.type === "notfound") {
    res.status(404).json({ message: "Record not found" });
  } else if (error.type === "invalid") {
    res.status(433).json({ message: error.message });
  } else {
    res.status(500).json({ message: error.message });
  }
});
export default router;
