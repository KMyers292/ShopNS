//===================================================================================================================================================================//
//                                                                      Upload Routes                                                                                //
//===================================================================================================================================================================//

import path from 'path';
import express from 'express';
import multer from 'multer'; // Middleware for handling multipart/form-data.
const router = express.Router();

//===================================================================================================================================================================//

// Config for multer. directs images to the uploads folder.
const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Function that checks whether the file is a jpg, jpeg, or png. If not, it will not upload file.
function checkFileType(file, cb) {

    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb('Images Only!');
    }
};

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

//===================================================================================================================================================================//

router.post('/', upload.single('image'), (req, res) => {
    
    res.send(`/${req.file.path}`);
});

//===================================================================================================================================================================//

export default router;