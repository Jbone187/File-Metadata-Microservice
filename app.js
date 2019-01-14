const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});
const upload = multer({ storage: storage });

app.post("/profile", upload.single("image"), function(req, res) {
  console.log(req.file);

  res.json({ msg: "File uploaded successfully!", file: req.file });
});

app.listen(3003, function() {
  console.log("Node is Running Microservice");
});
