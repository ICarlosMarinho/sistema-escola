const absenceController = require("../controller/absence");
const validateData = require("../middleware/data.validation/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("absence"), absenceController.register);
router.get("/find/:studentId/:subjectId", absenceController.find);
router.put("/update/:id", validateData("absence", "update"), absenceController.update);
router.delete("/delete/:id", absenceController.deletebyId);

module.exports = router;
