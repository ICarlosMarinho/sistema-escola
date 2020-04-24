const subjectController = require("../controller/subject");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();

router.get(
    "/index",
    validateToken(["Gestor", "Professor, Responsável"]),
    subjectController.index
);

router.get(
    "/find/:id",
    validateToken(["Gestor", "Professor, Responsável"]),
    subjectController.findById
);

router.use(validateToken(["Gestor"]));

router.post("/register", validateData("subject"), subjectController.register);
router.put("/update/:id", validateData("subject"), subjectController.update);
router.delete("/delete/:id", subjectController.deleteById);

module.exports = router;