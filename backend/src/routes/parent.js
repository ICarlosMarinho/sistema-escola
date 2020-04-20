const parentController = require("../controller/parent");
const getDataValidator = require("../middleware/data.validation/parent");
const router = require("express").Router();

router.post("/register", getDataValidator(), parentController.register);
router.get("/index", parentController.index);
router.get("/find/:id", parentController.findById);
router.put("/update/:id", getDataValidator("update"), parentController.update);
router.delete("/delete/:id", parentController.deleteById);

module.exports = router;