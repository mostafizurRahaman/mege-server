const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
   destination: "images/",
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "__" + Math.round(Math.random() * 1e9);
      const filename = uniqueSuffix + "__" + file.originalname;
      cb(null, filename);
   },
});
const uploader = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
      const supportedExtension = /png|jpg|jpeg|webp/;
      console.log(file);
      console.log(file.originalname);
      const fileExtension = path.extname(file.originalname);
      if (!supportedExtension.test(fileExtension)) {
         cb(
            new Error(
               `${fileExtension} not supported, support only jpg/png/jpeg`
            ),
            false
         );
      } else {
         cb(null, true);
      }
   },
});

exports.uploader = uploader;
