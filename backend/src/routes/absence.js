const absenceController = require("../controller/absence");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();

router.get(
    "/findTotalByStudent/:studentId",
    validateToken(["Gestor", "Professor", "Responsável"]),
    absenceController.findTotalByStudentId
);

router.use(validateToken(["Gestor", "Professor"]));

router.post("/register", validateData("absence"), absenceController.register);
router.get("/find/:subjectId/:studentId", absenceController.find);
router.put("/update/:id", validateData("absence", "update"), absenceController.update);
router.delete("/delete/:id", absenceController.deletebyId);

module.exports = router;
