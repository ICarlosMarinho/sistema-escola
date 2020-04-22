const parentController = require("../controller/parent");
const validateData = require("../middleware/data.validation/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("parent"), parentController.register);
router.get("/index", parentController.index);
router.get("/find/:id", parentController.findById);
router.put("/update/:id", validateData("parent", "update"), parentController.update);
router.delete("/delete/:id", parentController.deleteById);

module.exports = router;