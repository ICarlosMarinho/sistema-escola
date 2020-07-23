const gradeController = require("../controller/grade");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();


router.get(
    "/findByStudent/:studentId",
    validateToken(["Gestor", "Professor", "Responsável"]),
    gradeController.findByStudentId
);

router.use(validateToken(["Gestor", "Professor"]));

router.post("/register", validateData("grade"), gradeController.register);
router.get("/findByTest/:testId", gradeController.findByTestId);
router.get("/findByStudent/:studentId", gradeController.findByStudentId);
router.put("/update/:testId/:studentId", validateData("grade", "update"), gradeController.update);
router.delete("/delete/:testId/:studentId", gradeController.deleteByIds);

module.exports = router;