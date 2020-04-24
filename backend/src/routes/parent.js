const parentController = require("../controller/parent");
const validateData = require("../middleware/getDataValidator");
const validateToken = require("../middleware/getTokenValidator");
const router = require("express").Router();

router.get(
    "/find/:id",
    validateToken(["Gestor", "Responsável"]),
    parentController.findById
);

router.use(validateToken(["Gestor"]));

router.get("/index", parentController.index);
router.post("/register", validateData("parent"), parentController.register);
router.put("/update/:id", validateData("parent", "update"), parentController.update);
router.delete("/delete/:id", parentController.deleteById);

module.exports = router;