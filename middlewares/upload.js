const path = require('path');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

var upload = multer({
    storage: storage,
});

var profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/user_profiles');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

var profileUpload = multer({
    storage: profileStorage,
})

module.exports = {
    upload,
    profileUpload
};