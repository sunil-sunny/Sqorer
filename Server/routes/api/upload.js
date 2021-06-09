const express = require('@feathersjs/express');
const router = express.Router();
var path = require("path");

router.get("/", async (req, res) =>{
    try {
        console.log("al manje kaaa")
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
})

router.post("/", (req, res) => {
    const filer = req.files.file;
    console.log(filer);
    console.log("djjdjdj")


    if (req.files === null) {
        return res.status(400).json({ msg: "No file found !" });
    } else {
        console.log(req.files.file.name);
    }

    var imgext = [".jpg", ".jpeg", ".gif", ".png", ".PNG"];
    var vidext = [".mp4", ".flv"];
    var typer = null;
    if (imgext.includes(path.extname(filer.name))) {
        typer = "image";
    } else if (vidext.includes(path.extname(filer.name))) {
        typer = "video";
    } else {
        return res.status(400).json({
            msg: 
            "Incorrect file extention only jpg ,jpeg , gif , png and mp4 allowed !",
        });
    }

    const rand = Math.floor(Math.random() * Math.floor(2000));
    filer.mv(`${__dirname}/../../uploads/${rand}${filer.name}`, (err) => {
        if (err) {
        console.log(err);
        return res.status(500).send(err);
        }
        return res.json({
            filename: filer.name,
            filepath: `https://sqorer.herokuapp.com/${rand}${filer.name}`,
            success: "File uplaoded successfully !",
            type: "image",
        });
    });
});
module.exports = router;