const authController = require("../controller/auth");
const router = require("express").Router();
const authSchema = require("../schema/auth");

function validateAuth({ headers }, res, next) {
  const valueError = authSchema.validate(headers.authorization).error;

  if (valueError) {
    console.log(valueError);

    return res.status(200).json({ error: "Valid Basic auth required." });
  }
    
  return next();
}

router.get("/authenticate", validateAuth, authController.authenticate);

module.exports = router;