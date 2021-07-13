const multer = require('multer');
const upload = multer({dest:'uploads/'}).single("demo_image");