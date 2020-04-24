const testController = require("../controller/test");
const validateData = require("../middleware/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("test"), testController.register);
router.get("/find/:subjectId", testController.findBySubjectId);
router.put("/update/:id", validateData("test"), testController.update);
router.delete("/delete/:id", testController.deleteById);

module.exports = router;