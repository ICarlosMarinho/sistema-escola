const employeeController = require("../controller/employee");
const validateData = require("../middleware/data.validation/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("employee"), employeeController.register);
router.get("/find/:id", employeeController.findById);
router.get("/index", employeeController.index);
router.put("/update/:id", validateData("employee"), employeeController.update);
router.delete("/delete/:id", employeeController.deleteById);

module.exports = router;