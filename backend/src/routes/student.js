const studentController = require("../controller/student");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();

router.get(
    "/index",
    validateToken(["Gestor", "Professor, Responsável"]),
    studentController.index
);

router.get(
    "/find/:id", 
    validateToken(["Gestor", "Professor, Responsável"]),
    studentController.findById
);

router.use(validateToken(["Gestor"]));

router.post("/register", validateData("student"), studentController.register);
router.put("/update/:id", validateData("student", "update"), studentController.update);
router.delete("/delete/:id", studentController.deleteById);

module.exports = router;