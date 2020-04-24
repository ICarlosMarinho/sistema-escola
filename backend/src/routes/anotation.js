const anotationController = require("../controller/anotation");
const validateData = require("../middleware/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("anotation"), anotationController.register);
router.get("/findByStudent/:studentId", anotationController.findByStudentId);
router.put("/update/:id", validateData("anotation", "update"), anotationController.update);
router.delete("/delete/:id", anotationController.deleteById);

module.exports = router;