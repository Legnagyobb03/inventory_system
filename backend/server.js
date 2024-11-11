const express = require("express");
const app = express();
const cors = requie("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.get("/api", (req, res) =>{
    res.json({fruits: ["apple","banana"]})
});

app.listen(8080, () =>{
    console.log("Server started. ")
});