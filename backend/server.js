const express = require("express");
const cors = require("cors");
const authrouter = require("./router/authRouter");
const contectrouter = require("./router/contectRouter");
const serviseRouter = require("./router/serviceRouter");
const AdminRouter = require("./router/AdminRouter");
const app = express();
const ConnectToDb = require("./DB");
const errorMiddleware = require("./middleware/errorMiddleware");

app.use(cors());
app.use(express.json());
app.use("/auth", authrouter);
app.use("/contect", contectrouter);
app.use("/service", serviseRouter);
app.use("/admin", AdminRouter);

app.use(errorMiddleware);
const port = "5000";
ConnectToDb().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port} `);
  });
});
