const anotationController = require("../controller/anotation");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();

router.get(
    "/findByStudentAndClass/:studentId/:classId",
    validateToken(["Gestor", "Professor", "Responsável"]),
    anotationController.findByStudentAndClassId
);

router.use(validateToken(["Gestor", "Professor"]));

router.post("/register", validateData("anotation"), anotationController.register);
router.put("/update/:id", validateData("anotation", "update"), anotationController.update);
router.delete("/delete/:id", anotationController.deleteById);

module.exports = router;