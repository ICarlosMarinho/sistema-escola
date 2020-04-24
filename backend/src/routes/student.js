const studentController = require("../controller/student");
const validateData = require("../middleware/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("student"), studentController.register);
router.get("/index", studentController.index);
router.get("/find/:id", studentController.findById);
router.put("/update/:id", validateData("student", "update"), studentController.update);
router.delete("/delete/:id", studentController.deleteById);

module.exports = router;