const multer = require("multer");

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024, // Dosya boyutu sınırlaması
        fieldSize: 10 * 1024 * 1024, // Form alanı boyutu sınırlaması
    },
});


module.exports = upload;
