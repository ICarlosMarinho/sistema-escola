const classController = require("../controller/class");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();

router.get(
    "/index",
    validateToken(["Gestor", "Professor", "Responsável"]),
    classController.index
);

router.get(
    "/find/:id",
    validateToken(["Gestor", "Professor", "Responsável"]),
    classController.selectById
);

router.use(validateToken(["Gestor"]));

router.put("/update/:id", validateData("class"), classController.update);
router.delete("/delete/:id", classController.deleteById);
router.post("/register", validateData("class"), classController.register);

module.exports = router;