const authController = require("../controller/auth");
const validateData = require("../middleware/getDataValidator");
const router = require("express").Router();

router.use(validateData("employee", "auth"));

router.post("/authenticate", authController.authenticate);

module.exports = router;