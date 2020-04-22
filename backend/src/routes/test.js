const testController = require("../controller/test");
const dataValidator = require("../middleware/data.validation/test");
const router = require("express").Router();

router.post("/register", dataValidator, testController.register);
router.get("/index", testController.index);
router.put("/update/:id", dataValidator, testController.update);
router.delete("/delete/:id", testController.deleteById);

module.exports = router;