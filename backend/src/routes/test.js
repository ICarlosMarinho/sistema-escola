const testController = require("../controller/test");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();

router.get(
    "/find/:subjectId",
    validateToken(["Gestor", "Professor, Responsável"]),
    testController.findBySubjectId
);

router.use(validateToken(["Gestor", "Professor"]));

router.post("/register", validateData("test"), testController.register);
router.put("/update/:id", validateData("test"), testController.update);
router.delete("/delete/:id", testController.deleteById);

module.exports = router;