const app = require("express")();
const dotenv = require("dotenv").config();
const cors = require("cors");
const { json } = require("body-parser");
const employeeRouter = require("./routes/employee");
const studentRouter = require("./routes/student");
const parentRouter = require("./routes/parent");
const subjectRouter = require("./routes/subject");
const classRouter = require("./routes/class");
const gradeRouter = require("./routes/grade");
const testRouter = require("./routes/test");
const anotationRouter = require("./routes/anotation");
const absenceRouter = require("./routes/absence");
const userRouter = require("./routes/user");

const port = process.env.PORT || 3002;

app.use(json());
app.use(cors());
app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/student", studentRouter);
app.use("/parent", parentRouter);
app.use("/subject", subjectRouter);
app.use("/class", classRouter);
app.use("/test", testRouter);
app.use("/grade", gradeRouter);
app.use("/anotation", anotationRouter);
app.use("/absence", absenceRouter);

app.listen(port, () => {
    console.log("Server is running on port:", port);
});
