const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const date = require(__dirname+"/date.js")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", (req, res) => {
    const day=date.getDate()
    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
    const item = req.body.newItem;
    console.log(req.body);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
