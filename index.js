// basic Structure
const express = require("express");
const app = express();
const PORT = 8081;

// home routing
const home_router = require("./routes/home_router");
app.use("/home", home_router);

app.get("/", (req, res) => {
  res.send("Hey you can do it bro ! ");
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
