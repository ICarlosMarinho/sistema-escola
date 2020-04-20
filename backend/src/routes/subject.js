const subjectController = require("../controller/subject");
const dataValidator = require("../middleware/data.validation/subject");
const router = require("express").Router();

router.post("/register", dataValidator, subjectController.register);
router.get("/index", subjectController.index);
router.get("/find/:id", subjectController.findById);
router.put("/update/:id", dataValidator, subjectController.update);
router.delete("/delete/:id", subjectController.deleteById);

module.exports = router;