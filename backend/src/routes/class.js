const classController = require("../controller/class");
const router = require("express").Router();
const dataValidator = require("../middleware/data.validation/class");

router.post("/register", dataValidator, classController.register);
router.get("/index", classController.index);
router.get("/find/:id", classController.selectById);
router.put("/update/:id", dataValidator, classController.update);
router.delete("/delete/:id", classController.deleteById);

module.exports = router;