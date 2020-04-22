const gradeController = require("../controller/grade");
const validateData = require("../middleware/data.validation/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("grade"), gradeController.register);
router.get("/findByStudent/:studentId", gradeController.findByStudentId);
router.get("/findByTest/:testId", gradeController.findByTestId);
router.put("/update", validateData("grade", "update"), gradeController.update);
router.delete("/delete", gradeController.deleteByIds);

module.exports = router;