const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({
    dest: path.join(__dirname, "uploads"),
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, path.join(__dirname, "uploads"));
        },
        filename: (_req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});

function getFileNames() {
    let arr = fs.readdirSync(path.join(__dirname, "uploads"));
    let files = [];

    arr.forEach(file => {
        if (file != '.gitkeep')
            files.push(`/uploads/${file}`);
    });

    return files;
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("", express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
    res.render("index", { files: getFileNames() });
});

app.get("/upload", (_req, res) => {
    res.render("upload");
});

app.post("/upload", upload.single("file"), (_req, res) => {
    res.redirect("/");
});

app.listen(80, () => {
    console.log(`Listening on port 80`);
})