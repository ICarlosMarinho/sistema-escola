const studentController = require("../controller/student");
const getDataValidator = require("../middleware/data.validation/student");
const router = require("express").Router();

router.post("/register", getDataValidator(), studentController.register);
router.get("/index", studentController.index);
router.get("/find/:id", studentController.findById);
router.put("/update/:id", getDataValidator("update"), studentController.update);
router.delete("/delete/:id", studentController.deleteById);

module.exports = router;