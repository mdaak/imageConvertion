const express = require("express");
const multer = require("multer");
const webp = require("webp-converter");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

app.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) throw err;
    console.log(req.file.path);

    //     const result = webp.cwebp("nodejs_logo.jpg","nodejs_logo.webp","-q 80",logging="-v");
    // result.then((response) => {
    //   console.log(response);
    // });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
