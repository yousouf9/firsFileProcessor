const multer         = require('multer');
const   crypto       = require('crypto');
const fileExtension  = require('file-extension')


let storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split('.')[1]);
            });
    }
});

module.exports = {
    storage
}