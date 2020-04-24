const subjectController = require("../controller/subject");
const validateData = require("../middleware/getDataValidator");
const router = require("express").Router();

router.post("/register", validateData("subject"), subjectController.register);
router.get("/index", subjectController.index);
router.get("/find/:id", subjectController.findById);
router.put("/update/:id", validateData("subject"), subjectController.update);
router.delete("/delete/:id", subjectController.deleteById);

module.exports = router;