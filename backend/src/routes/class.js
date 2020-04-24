const classController = require("../controller/class");
const validateData = require("../middleware/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("class"), classController.register);
router.get("/index", classController.index);
router.get("/find/:id", classController.selectById);
router.put("/update/:id", validateData("class"), classController.update);
router.delete("/delete/:id", classController.deleteById);

module.exports = router;