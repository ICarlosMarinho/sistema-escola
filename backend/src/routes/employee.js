const dataValidation = require("../middleware/data.validation/user");
const employeeController = require("../controller/employee");
const router = require("express").Router();

router.post("/register", dataValidation, employeeController.register);
router.get("/find/:id", employeeController.findById);
router.get("/index", employeeController.index);
router.put("/update/:id", dataValidation, employeeController.update);
router.delete("/delete/:id", employeeController.deleteById);

module.exports = router;