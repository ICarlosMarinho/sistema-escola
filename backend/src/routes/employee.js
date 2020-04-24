const employeeController = require("../controller/employee");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();


router.get(
    "/find/:id",
    validateToken(["Gestor", "Professor", "Responsável"]),
    employeeController.findById
);

router.get(
    "/index",
    validateToken(["Gestor", "Professor", "Responsável"]),
    employeeController.index
);

router.use(validateToken(["Gestor"]));

router.post("/register", validateData("employee"), employeeController.register);
router.put("/update/:id", validateData("employee"), employeeController.update);
router.delete("/delete/:id", employeeController.deleteById);

module.exports = router;