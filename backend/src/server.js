const app = require("express")();
const { json } = require("body-parser");
const dotenv = require("dotenv").config();
const employeeRouter = require("./routes/employee");
const studentRouter = require("./routes/student");
const parentRouter = require("./routes/parent");
const subjectRouter = require("./routes/subject");
const port = process.env.PORT || 3000;

app.use(json());
app.use("/employee", employeeRouter);
app.use("/student", studentRouter);
app.use("/parent", parentRouter);
app.use("/subject", subjectRouter);

app.listen(port, () => {
    console.log("Server is running on port:", port);
});